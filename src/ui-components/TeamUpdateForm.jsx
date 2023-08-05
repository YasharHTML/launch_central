/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Team } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function TeamUpdateForm(props) {
  const {
    id: idProp,
    team: teamModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    teamName: "",
    teamDescription: "",
    teamCreationDate: "",
  };
  const [teamName, setTeamName] = React.useState(initialValues.teamName);
  const [teamDescription, setTeamDescription] = React.useState(
    initialValues.teamDescription
  );
  const [teamCreationDate, setTeamCreationDate] = React.useState(
    initialValues.teamCreationDate
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = teamRecord
      ? { ...initialValues, ...teamRecord }
      : initialValues;
    setTeamName(cleanValues.teamName);
    setTeamDescription(cleanValues.teamDescription);
    setTeamCreationDate(cleanValues.teamCreationDate);
    setErrors({});
  };
  const [teamRecord, setTeamRecord] = React.useState(teamModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Team, idProp)
        : teamModelProp;
      setTeamRecord(record);
    };
    queryData();
  }, [idProp, teamModelProp]);
  React.useEffect(resetStateValues, [teamRecord]);
  const validations = {
    teamName: [{ type: "Required" }],
    teamDescription: [{ type: "Required" }],
    teamCreationDate: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          teamName,
          teamDescription,
          teamCreationDate,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            Team.copyOf(teamRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "TeamUpdateForm")}
      {...rest}
    >
      <TextField
        label="Team name"
        isRequired={true}
        isReadOnly={false}
        value={teamName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              teamName: value,
              teamDescription,
              teamCreationDate,
            };
            const result = onChange(modelFields);
            value = result?.teamName ?? value;
          }
          if (errors.teamName?.hasError) {
            runValidationTasks("teamName", value);
          }
          setTeamName(value);
        }}
        onBlur={() => runValidationTasks("teamName", teamName)}
        errorMessage={errors.teamName?.errorMessage}
        hasError={errors.teamName?.hasError}
        {...getOverrideProps(overrides, "teamName")}
      ></TextField>
      <TextField
        label="Team description"
        isRequired={true}
        isReadOnly={false}
        value={teamDescription}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              teamName,
              teamDescription: value,
              teamCreationDate,
            };
            const result = onChange(modelFields);
            value = result?.teamDescription ?? value;
          }
          if (errors.teamDescription?.hasError) {
            runValidationTasks("teamDescription", value);
          }
          setTeamDescription(value);
        }}
        onBlur={() => runValidationTasks("teamDescription", teamDescription)}
        errorMessage={errors.teamDescription?.errorMessage}
        hasError={errors.teamDescription?.hasError}
        {...getOverrideProps(overrides, "teamDescription")}
      ></TextField>
      <TextField
        label="Team creation date"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={teamCreationDate && convertToLocal(new Date(teamCreationDate))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              teamName,
              teamDescription,
              teamCreationDate: value,
            };
            const result = onChange(modelFields);
            value = result?.teamCreationDate ?? value;
          }
          if (errors.teamCreationDate?.hasError) {
            runValidationTasks("teamCreationDate", value);
          }
          setTeamCreationDate(value);
        }}
        onBlur={() => runValidationTasks("teamCreationDate", teamCreationDate)}
        errorMessage={errors.teamCreationDate?.errorMessage}
        hasError={errors.teamCreationDate?.hasError}
        {...getOverrideProps(overrides, "teamCreationDate")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || teamModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || teamModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
