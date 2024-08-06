import { Create, ReferenceField, required, SimpleForm, TextInput } from "react-admin";


export default function CreateUnit() {
  return (
    <Create redirect="list">
        <SimpleForm>
            <TextInput validate={[required()]} source="title" aria-required label="Title"/>
            <TextInput validate={[required()]} source="description" aria-required label="Description"/>
            <ReferenceField source="courseId" reference="courses" />
            <TextInput validate={[required()]} source="courseId" aria-required label="Course ID"/>
        </SimpleForm>
    </Create>
  );
}
