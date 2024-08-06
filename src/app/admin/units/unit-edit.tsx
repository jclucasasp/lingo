import { checkRole } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { Edit, ReferenceField, required, SimpleForm, TextInput } from "react-admin";

export default function EditUnit() {
  return (
    <Edit redirect="list">
      <SimpleForm>
        <TextInput id="id" validate={[required()]} source="id" disabled />
        <TextInput source="title" validate={[required()]} aria-required label="Title" />
        <TextInput source="description" validate={[required()]} aria-required label="Description" />
        <ReferenceField source="courseId" reference="courses" />
        <TextInput source="courseId" />
      </SimpleForm>
    </Edit>
  );
}
