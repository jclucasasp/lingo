import { Edit, SimpleForm, TextInput, required, ReferenceField } from "react-admin";

export default function EditLesson() {
    return (
        <Edit redirect="list">
            <SimpleForm>
                <TextInput id="id" validate={[required()]} source="id" disabled />
                <TextInput source="title" validate={[required()]} aria-required label="Title" />
                <ReferenceField source="unitId" reference="units" label="Unit" />
                <TextInput source="unitId" validate={[required()]} aria-required label="Unit ID" />
            </SimpleForm>
        </Edit>
    );
}