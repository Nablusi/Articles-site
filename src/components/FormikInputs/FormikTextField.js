import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { ErrorMessage, Field } from "formik";
import React from "react";

export default function FormikTextField(props) {
  return (
    <Grid item>
      <Field name={props.name}>
        {({ field }) => {
          return <TextField {...props} {...field} variant="outlined" />;
        }}
      </Field>
      <Typography>
        <ErrorMessage name={props.name} />
      </Typography>
    </Grid>
  );
}
