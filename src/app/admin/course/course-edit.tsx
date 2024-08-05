import { Create, Edit, required, SimpleForm, TextInput } from "react-admin";

export default function EditCourse() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput id="id" validate={[required()]} source="id" disabled />
        <TextInput source="title" validate={[required()]}  aria-required label="Title" />
        <TextInput source="imageSrc" validate={[required()]} aria-required label="Image URL" />
      </SimpleForm>
    </Edit>
  );
}
