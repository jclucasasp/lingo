import { Create, required, SimpleForm, TextInput } from "react-admin";

export default function CreateCourse() {
    return(
        <Create redirect="list">
            <SimpleForm>
                <TextInput validate={[required()]} source="title" aria-required label="Title"/>
                <TextInput validate={[required()]} source="imageSrc" aria-required label="Image URL"/>
            </SimpleForm>
        </Create>
    );
}