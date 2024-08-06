import { Create, ReferenceField, required, SimpleForm, TextInput } from "react-admin";

export default function CreateLesson() {
  return (
    <Create redirect="list">
        <SimpleForm>
            <TextInput validate={[required()]} source="title" aria-required label="Title"/>
            <ReferenceField source="unitId" reference="units" label="Unit" />
            <TextInput validate={[required()]} source="unitId" aria-required label="Unit ID"/>
        </SimpleForm>
    </Create>
  )
}
