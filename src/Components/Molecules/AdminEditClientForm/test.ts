import React, {
  useReducer,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Autocomplete from "@mui/material/Autocomplete";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useRouter } from "next/router";

// Custom.
import BoxConstants from "@/services/BoxApi/BoxConstants";
import I18n from "@/services/BoxApi/I18n";
import { GeneralObject } from "@/services/BoxApi/global";
import SelectField from "@/components/SelectField";
import {
  reducer,
  getFullName,
  getStatuses,
  localStorage,
  getSavedFilters,
  getFiltersToSave,
} from "@/services/BoxApi/BoxHelpers";
import { getInitialState } from "./state";
import { UserFiltersProps, UserFilter, User } from "../global";
import { Role } from "@/entities/Settings/Acl/global";
import { Skill } from "@/entities/Settings/Skills/global";
import dayjs from "dayjs";
import BoxAuth from "@/services/BoxApi/BoxAuth";
import SearchField from "@/components/SearchField";
import { WorkingRole } from "@/entities/Settings/WorkingRoles/global";
import { Status } from "@/entities/Status/global";

let filteringTimeout = 0;

const UserFilters = forwardRef((props: UserFiltersProps, ref) => {
  const {
    data,
    onChange,
    showOnly,
    showFilters = [
      "search",
      "consultants",
      "available",
      "divider",
      "roles",
      "statuses",
      "userStatus",
      "divider",
      "workingRoles",
      "skills",
      "industries",
      "yearsOfExperience",
      "divider",
      "workingLocations",
      "cities",
      "countries",
      "nationalities",
      "employerSearch",
      "divider",
      "consultantManagers",
      "accountStatus",
      "divider",
      "csv",
    ],
    defaultValues,
    filterName = "UserFilters",
    reset,
    openDialog,
    bypassSaving = ["accountStatus"],
    disabledFilters = [],
    hideWantWork = false,
  } = props;

  const [state, dispatch] = useReducer(reducer, getInitialState());
  const router = useRouter();
  const { pathname, query } = router;

  useImperativeHandle(ref, () => ({
    resetFilters() {
      resetFilters();
    },
    state: state,
  }));

  // Methods.

  const getSelectData = (name: string) => {
    const result = !data
      ? []
      : data[name]
        ?.filter((v: GeneralObject) =>
          showOnly && showOnly[name]
            ? showOnly[name].indexOf(v.name || v.label) > -1
            : true
        )
        ?.map((v: GeneralObject) => ({
          name: v.label || v.name,
          id: v.id,
        }));
    if (name === "cities" && result) {
      result.push({
        name: "Unknown",
        id: null,
      });
    }

    return result;
  };

  const getStatusOptions = () => {
    if (!data) {
      return [];
    }
    if (!showOnly || !showOnly.hasOwnProperty("roles")) {
      const allStatuses = getSelectData("statuses");
      if (state.filters.roles.length > 0) {
        const statusesToShow = data.roles
          .filter((v: Role) =>
            state.filters.roles.find((role: Role) => role.id === v.id)
          )
          .map((role: Role) => role.statuses)[0];
        const statusesByRole = allStatuses.filter((status: Status) =>
          statusesToShow.find((v: Status) => status.id === v.id)
        );
        return statusesByRole;
      }
      return allStatuses;
    }
    const allRoles = data.roles;
    const rolesToShow = allRoles?.filter(
      (v: Role) =>
        v?.name &&
        showOnly.roles.indexOf(v.name) > -1 &&
        (showOnly.roles.length === 1 ||
          state.filters.roles.find((role: Role) => role.id === v.id))
    );

    return getStatuses({ roles: rolesToShow }, allRoles);
  };

  const handleFilterChange = (
    name: string,
    item: GeneralObject | GeneralObject[] | string | null
  ) => {
    const newFilters = { ...state.filters };
    newFilters[name] = item;
    dispatch({ key: "filters", values: newFilters });
  };

  const getConsultantManagers = () => {
    const unassigned = {
      id: null,
      firstName: I18n.get.misc.unassigned,
    };

    if (data) {
      const result = data?.consultantManagers?.map((v: GeneralObject) => ({
        id: v.id,
        firstName: getFullName(v),
      }));

      result?.unshift(unassigned);

      return result;
    }

    return [unassigned];
  };

  const getSkillFromFilter = (skillId: string) =>
    state.filters.skills.find((v: Skill) => v.id === skillId) || null;

  const handleSkillChange = (event: SelectChangeEvent<unknown>) => {
    const { name, value } = event.target;
    const skills = JSON.parse(JSON.stringify(state.filters.skills));
    const nameParts = name.split("_");
    const i = skills.findIndex((v: Skill) => v.id === nameParts[1]);
    if (i === -1) {
      return;
    }
    if (!skills[i].hasOwnProperty("pivot")) {
      skills[i].pivot = {};
    }
    if (value === "all") {
      delete skills[i].pivot[nameParts[0]];
    } else {
      skills[i].pivot[nameParts[0]] =
        typeof value === "string" ? JSON.parse(value) : value;
    }
    handleFilterChange("skills", skills);
  };

  const getSkillValue = (field: string) => {
    const fieldParts = field.split("_");
    const skill = getSkillFromFilter(fieldParts[1]);
    let value = skill && skill?.pivot?.[fieldParts[0]];
    if (typeof value === "undefined") {
      return "all";
    }
    if (typeof value === "string") {
      value = JSON.parse(value);
    }
    return value;
  };

  const resetFilters = () => {
    localStorage.remove(filterName);
    dispatch({
      values: { filters: { ...getInitialState().filters, ...defaultValues } },
    });
  };

  const isDisabled = (field?: UserFilter) => {
    if (Boolean(!data)) {
      return true;
    }
    return field && disabledFilters?.includes(field);
  };

  const getFieldValue = (field: UserFilter) => {
    if (
      disabledFilters?.includes(field) &&
      showOnly?.hasOwnProperty(field) &&
      data?.[field]
    ) {
      const items = data[field].filter((item: GeneralObject) =>
        showOnly[field].includes(item?.name || item?.label || item?.id)
      );
      return items.map((item: GeneralObject) => ({
        id: item?.id,
        name: item?.label || item?.name,
      }));
    }
    return state.filters[field];
  };

  const getFiltersToShow = () =>
    showFilters.filter((filter: UserFilter) => {
      switch (filter) {
        case "statuses":
          return showOnly?.hasOwnProperty("roles") && showOnly.roles.length > 1
            ? state.filters.roles.length > 0
            : true;
        default:
          return true;
      }
    });

  const getFilter = (name: UserFilter) => (
    <>
      {name === "divider" && <Divider />}
      {name === "search" && (
        <SearchField
          defaultValue={state.filters.search}
          onSearch={(searchTerm) => handleFilterChange("search", searchTerm)}
          TextFieldProps={{
            disabled: isDisabled(),
            variant: "outlined",
            size: "small",
            label: I18n.get.search.labels.search,
          }}
          tooltipText={I18n.get.search.labels.tooltip}
        />
      )}
      {name === "employerSearch" && (
        <SearchField
          defaultValue={state.filters.employerSearch}
          onSearch={(searchTerm) =>
            handleFilterChange("employerSearch", searchTerm)
          }
          TextFieldProps={{
            disabled: isDisabled(),
            variant: "outlined",
            size: "small",
            label: I18n.get.search.labels.employerSearch,
          }}
        />
      )}
      {name === "consultants" && (
        <SelectField
          types={["user", "deleted_user"]}
          filters={[
            {
              type: "user",
              value: JSON.stringify({
                roles: [
                  BoxConstants.userRoles.CANDIDATE,
                  BoxConstants.userRoles.MEMBER,
                  BoxConstants.userRoles.PARTNER_CONSULTANT,
                  BoxConstants.userRoles.PARTNER_ADMIN,
                ],
                withTrashed: true,
                timeReportFilter: state?.filters,
              }),
            },
            {
              type: "deleted_user",
              value: JSON.stringify({
                roles: [
                  BoxConstants.userRoles.CANDIDATE,
                  BoxConstants.userRoles.MEMBER,
                  BoxConstants.userRoles.PARTNER_CONSULTANT,
                  BoxConstants.userRoles.PARTNER_ADMIN,
                ],
                timeReportFilter: state?.filters,
              }),
            },
          ]}
          onChange={(newValue: unknown) =>
            // handleFilterChange("search", newValue as GeneralObject)
            handleFilterChange("consultants", newValue as GeneralObject)
          }
          AutocompleteProps={{
            disabled: isDisabled(),
            value: state.filters.consultants,
            multiple: true,
            getOptionLabel: (option: GeneralObject) =>
              getFullName(option) || "",
            isOptionEqualToValue: (
              option: GeneralObject,
              value: GeneralObject
            ) => value && option.id === value.id,
          }}
          TextFieldProps={{
            variant: "outlined",
            size: "small",
            fullWidth: true,
            label: I18n.get.misc.consultants,
          }}
        />
      )}
      {name === "statuses" && (
        <SelectField
          types={["status"]}
          disableApiSearch
          onChange={(newValue: unknown) =>
            handleFilterChange("statuses", newValue as GeneralObject)
          }
          AutocompleteProps={{
            disabled: isDisabled(),
            value: state.filters.statuses,
            multiple: true,
            options: getStatusOptions(),
            getOptionLabel: (option: GeneralObject) =>
              option ? option.name : "",
            isOptionEqualToValue: (
              option: GeneralObject,
              value: GeneralObject
            ) => value.id === option.id,
          }}
          TextFieldProps={{
            variant: "outlined",
            size: "small",
            fullWidth: true,
            label: I18n.get.status.labels.statuses,
          }}
        />
      )}

      {name === "skills" && (
        <Box>
          <SelectField
            types={["skill"]}
            minimumLettersToSearch={1}
            filters={[
              {
                type: "skill",
                value: JSON.stringify({
                  custom: false,
                }),
              },
            ]}
            onChange={(newValue: unknown) => {
              const value = newValue as GeneralObject[];
              dispatch({
                key: "skillSelected",
                values: value.length === 0 ? 0 : value[value.length - 1].id,
              });
              handleFilterChange("skills", newValue as GeneralObject[]);
            }}
            AutocompleteProps={{
              disabled: isDisabled(),
              value: state.filters.skills,
              multiple: true,
              getOptionLabel: (option: GeneralObject) => option.name,
              isOptionEqualToValue: (
                option: GeneralObject,
                value: GeneralObject
              ) => value && option.id === value.id,
              renderTags: (value, getTagProps) =>
                value.map((option, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <Chip
                    label={option.name}
                    {...getTagProps({ index })}
                    // onClick={() =>
                    //   dispatch({ key: "skillSelected", values: option.id })
                    // }
                    size="small"
                  />
                )),
            }}
            TextFieldProps={{
              variant: "outlined",
              size: "small",
              fullWidth: true,
              label: I18n.get.form.labels.skills,
            }}
          />

          {state.filters.skills.length > 0 && (
            <Box
              sx={(theme) => ({
                mb: 1,
                mt: 1,
                pl: 2,
                position: "relative",
                "&:before": {
                  borderLeft: `2px solid ${theme.palette.grey[300]}`,
                  bottom: 0,
                  content: "''",
                  left: 0,
                  position: "absolute",
                  top: 0,
                },
              })}
            >
              {state.filters.skills.map((v: Skill, i: number) => (
                <Box sx={{ mt: 1.5 }} key={v.id}>
                  <Typography
                    // textAlign="center"
                    marginBottom={1}
                    component="h6"
                    variant="body1"
                  >
                    {v.name}
                  </Typography>
                  <Stack direction="row">
                    <FormControl
                      fullWidth
                      size="small"
                      sx={{ mr: 0.5 }}
                      disabled={isDisabled()}
                    >
                      <InputLabel id="filter-skill-level-label">
                        {I18n.get.skill.labels.level}
                      </InputLabel>
                      <Select
                        name={`level_${v.id}`}
                        labelId="filter-skill-level-label"
                        id="filter-skill-level-select"
                        value={getSkillValue(`level_${v.id}`)}
                        label={I18n.get.skill.labels.level}
                        onChange={handleSkillChange}
                      >
                        <MenuItem value="all">{I18n.get.misc.all}</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                      </Select>
                    </FormControl>
                    {!hideWantWork && (
                      <FormControl fullWidth size="small" sx={{ ml: 0.5 }}>
                        <InputLabel id="demo-simple-want-label">
                          {I18n.get.skill.labels.wantWork}
                        </InputLabel>
                        <Select
                          name={`wantWork_${v.id}`}
                          labelId="filter-skill-want-label"
                          id="filter-skill-want-select"
                          value={getSkillValue(`wantWork_${v.id}`)}
                          label={I18n.get.skill.labels.wantWork}
                          onChange={handleSkillChange}
                        >
                          <MenuItem value="all">{I18n.get.misc.all}</MenuItem>
                          <MenuItem value="true">
                            {I18n.get.actions.yes}
                          </MenuItem>
                          <MenuItem value="false">
                            {I18n.get.actions.no}
                          </MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  </Stack>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      )}

      {name === "roles" && (
        <SelectField
          types={["role"]}
          disableApiSearch
          onChange={(newValue: unknown) =>
            handleFilterChange("roles", newValue as GeneralObject)
          }
          AutocompleteProps={{
            disabled: isDisabled("roles"),
            value: getFieldValue("roles"),
            multiple: true,
            options: getSelectData("roles"),
            getOptionLabel: (option: GeneralObject) =>
              option ? option.name : "",
            isOptionEqualToValue: (
              option: GeneralObject,
              value: GeneralObject
            ) => value.id === option.id,
          }}
          TextFieldProps={{
            variant: "outlined",
            size: "small",
            fullWidth: true,
            label: I18n.get.user.labels.typeOfConsultants,
          }}
        />
      )}

      {name === "workingRoles" && (
        <SelectField
          types={["working_role"]}
          disableApiSearch
          onChange={(newValue: unknown) =>
            handleFilterChange("workingRoles", newValue as GeneralObject)
          }
          AutocompleteProps={{
            disabled: isDisabled(),
            value: state.filters.workingRoles,
            multiple: true,
            options: getSelectData("workingRoles"),
            getOptionLabel: (option: GeneralObject) => option.name,
            isOptionEqualToValue: (
              option: GeneralObject,
              value: GeneralObject
            ) => value && option.id === value.id,
          }}
          TextFieldProps={{
            variant: "outlined",
            size: "small",
            fullWidth: true,
            label: I18n.get.user.filterLabels.allRoles,
          }}
        />
      )}

      {name === "industries" && (
        <SelectField
          types={["industry"]}
          disableApiSearch
          onChange={(newValue: unknown) =>
            handleFilterChange("industries", newValue as GeneralObject)
          }
          AutocompleteProps={{
            disabled: isDisabled(),
            value: state.filters.industries,
            multiple: true,
            options: getSelectData("industries"),
            getOptionLabel: (option: GeneralObject) => option.name,
            isOptionEqualToValue: (
              option: GeneralObject,
              value: GeneralObject
            ) => value && option.id === value.id,
          }}
          TextFieldProps={{
            variant: "outlined",
            size: "small",
            fullWidth: true,
            label: I18n.get.industry.labels.industries.en,
          }}
        />
      )}

      {name === "yearsOfExperience" && (
        <SelectField
          types={["yearsOfExperience"]}
          disableApiSearch
          onChange={(newValue: unknown) =>
            handleFilterChange("yearsOfExperience", newValue as GeneralObject)
          }
          AutocompleteProps={{
            disabled: isDisabled(),
            value: state.filters.yearsOfExperience,
            multiple: true,
            options: getSelectData("yearsOfExperience"),
            getOptionLabel: (option: GeneralObject) => option.name,
            isOptionEqualToValue: (
              option: GeneralObject,
              value: GeneralObject
            ) => value && option.id === value.id,
          }}
          TextFieldProps={{
            variant: "outlined",
            size: "small",
            fullWidth: true,
            label: I18n.get.cv.cvStrings.yearsOfExperience.en,
          }}
        />
      )}

      {name === "terms" && (
        <Autocomplete
          disablePortal
          value={
            state.filters.terms !== ""
              ? I18n.get.user.filters.terms.find(
                (v: GeneralObject) => v.value === state.filters.terms
              )
              : null
          }
          onChange={(event, value) =>
            handleFilterChange("terms", value?.value || "")
          }
          options={I18n.get.user.filters.terms}
          isOptionEqualToValue={(option: GeneralObject, value: GeneralObject) =>
            value && option.value === value.value
          }
          disabled={isDisabled()}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              size="small"
              label={I18n.get.user.labels.memberTerms}
            />
          )}
        />
      )}

      {name === "cities" && (
        <SelectField
          types={["city"]}
          disableApiSearch
          onChange={(newValue: unknown) =>
            handleFilterChange("cities", newValue as GeneralObject)
          }
          AutocompleteProps={{
            disabled: isDisabled(),
            value: state.filters.cities,
            multiple: true,
            options: getSelectData("cities"),
            getOptionLabel: (option: GeneralObject) =>
              option ? option.name : "",
            isOptionEqualToValue: (
              option: GeneralObject,
              value: GeneralObject
            ) => value.id === option.id,
          }}
          TextFieldProps={{
            variant: "outlined",
            size: "small",
            fullWidth: true,
            label: `${I18n.get.user.labels.userCity}`,
          }}
        />
      )}

      {name === "nationalities" && (
        <SelectField
          types={["country"]}
          onChange={(newValue: unknown) =>
            handleFilterChange("nationalities", newValue as GeneralObject)
          }
          AutocompleteProps={{
            disabled: isDisabled(),
            value: state.filters.nationalities,
            multiple: true,
            getOptionLabel: (option: GeneralObject) => option.name,
            isOptionEqualToValue: (
              option: GeneralObject,
              value: GeneralObject
            ) => value && option.code === value.code,
          }}
          TextFieldProps={{
            variant: "outlined",
            size: "small",
            fullWidth: true,
            label: I18n.get.country.labels.nationality,
          }}
        />
      )}

      {name === "countries" && (
        <SelectField
          types={["country"]}
          onChange={(newValue: unknown) =>
            handleFilterChange("countries", newValue as GeneralObject)
          }
          AutocompleteProps={{
            disabled: isDisabled(),
            value: state.filters.countries,
            multiple: true,
            getOptionLabel: (option: GeneralObject) => option.name,
            isOptionEqualToValue: (
              option: GeneralObject,
              value: GeneralObject
            ) => value && option.code === value.code,
          }}
          TextFieldProps={{
            variant: "outlined",
            size: "small",
            fullWidth: true,
            label: I18n.get.country.labels.workingCountry,
          }}
        />
      )}

      {name === "workingLocations" && (
        <SelectField
          types={["working_location"]}
          disableApiSearch
          onChange={(newValue: unknown) =>
            handleFilterChange("workingLocations", newValue as GeneralObject)
          }
          AutocompleteProps={{
            disabled: isDisabled(),
            value: state.filters.workingLocations,
            multiple: true,
            options: getSelectData("workingLocations"),
            getOptionLabel: (option: GeneralObject) => option.name,
            isOptionEqualToValue: (
              option: GeneralObject,
              value: GeneralObject
            ) => value && option.id === value.id,
          }}
          TextFieldProps={{
            variant: "outlined",
            size: "small",
            fullWidth: true,
            label: I18n.get.workingLocation.labels.workingLocations,
          }}
        />
      )}

      {name === "available" && (
        <Box sx={{ position: "relative" }}>
          <DatePicker
            disabled={isDisabled()}
            label={I18n.get.user.labels.availableFrom}
            format="YYYY-MM-DD"
            value={
              state.filters.available ? dayjs(state.filters.available) : null
            }
            onChange={(newValue: any) =>
              handleFilterChange(
                "available",
                (newValue?.format("YYYY-MM-DD") as string) || null
              )
            }
            slotProps={{
              textField: {
                size: "small",
                fullWidth: true,
              },
            }}
          />
          {state.filters.available && (
            <IconButton
              onClick={() => handleFilterChange("available", null)}
              sx={{ position: "absolute", right: 42, top: 0 }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      )}

      {name === "consultantManagers" && (
        <SelectField
          types={["user"]}
          disableApiSearch
          onChange={(newValue: unknown) =>
            handleFilterChange("consultantManagers", newValue as GeneralObject)
          }
          AutocompleteProps={{
            disabled: isDisabled(),
            value: state.filters.consultantManagers,
            multiple: true,
            options: getConsultantManagers(),
            getOptionLabel: (option: GeneralObject) => getFullName(option),
            isOptionEqualToValue: (
              option: GeneralObject,
              value: GeneralObject
            ) => value && option.id === value.id,
          }}
          TextFieldProps={{
            variant: "outlined",
            size: "small",
            fullWidth: true,
            label: I18n.get.form.labels.consultantManager,
          }}
        />
      )}

      {name === "userStatus" && (
        <Autocomplete
          disablePortal
          multiple={true}
          value={state.filters.userStatus}
          onChange={(event, value) => {
            handleFilterChange("userStatus", value);
          }}
          options={I18n.get.user.filters.userStatus}
          isOptionEqualToValue={(option: GeneralObject, value: GeneralObject) =>
            value && option.value === value.value
          }
          disabled={isDisabled()}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              size="small"
              label={I18n.get.user.labels.userStatus}
            />
          )}
        />
      )}
      {name === "accountStatus" && (
        <Autocomplete
          disablePortal
          multiple={true}
          value={state.filters.accountStatus}
          onChange={(event, value) => {
            handleFilterChange("accountStatus", value);
          }}
          options={I18n.get.user.filters.accountStatus}
          isOptionEqualToValue={(option: GeneralObject, value: GeneralObject) =>
            value && option.value === value.value
          }
          disabled={isDisabled()}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              size="small"
              label={I18n.get.user.labels.accountStatus}
            />
          )}
        />
      )}
      {name === "csv" && BoxAuth.ability.can("csv", "Users") && (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="small"
          onClick={openDialog}
          disabled={isDisabled()}
        >
          {I18n.get.csv.labels.download}
        </Button>
      )}
    </>
  );

  // Effects.

  useEffect(() => {
    const savedFilters = getSavedFilters(filterName, showFilters, {
      ...getInitialState().filters,
      ...defaultValues,
    });

    let startValues = {
      filters: {
        ...savedFilters,
      },
    };

    if (query?.search) {
      startValues = { ...getInitialState(), ...startValues };
      startValues.filters.search = query.search;
    }

    if (startValues) {
      const newValues = { ...getInitialState(), ...startValues };
      dispatch({ values: newValues });
      if (query?.search) {
        const newQuery = { ...query };
        delete newQuery.search;
        router.push({ pathname, query: newQuery }, "", { shallow: true });
      }
      // @NOTE Placed here to trigger request on first load. Otherwise we need to wait for
      // the next "cycle" after the state has been updated.
      // onChange && onChange(JSON.parse(JSON.stringify(newValues.filters)));
    }
  }, []);

  useEffect(() => {
    if (query?.search) {
      const startValues = getInitialState();
      startValues.filters.search = query.search as string;
      dispatch({ values: startValues });
    }
  }, [query]);

  useEffect(() => {
    if (onChange) {
      clearTimeout(filteringTimeout);
      filteringTimeout = window.setTimeout(async () => {
        onChange(JSON.parse(JSON.stringify(state.filters)));
        const filtersToSave = getFiltersToSave(bypassSaving, state.filters);
        if (filtersToSave) {
          localStorage.set(
            filterName,
            JSON.stringify({ filters: filtersToSave })
          );
        }
      }, 50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, filterName]);

  useEffect(() => {
    if (reset) {
      resetFilters();
    }
  }, [reset]);

  return (
    <Grid container spacing={2}>
      {getFiltersToShow().map((filter: UserFilter, i: number) => (
        <Grid
          key={`${filter}-${i}`}
          item
          xs={12}
          sx={(theme) => ({
            "& .MuiInputBase-root": {
              backgroundColor: theme.palette.common.white,
            },
          })}
        >
          {getFilter(filter)}
        </Grid>
      ))}
    </Grid>
  );
});

UserFilters.displayName = "UserFilters";

export default UserFilters;
