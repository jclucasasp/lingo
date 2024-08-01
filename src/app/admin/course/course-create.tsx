import { Create, SimpleForm, TextInput } from "react-admin";

export default function CreateCourse() {
    return(
        <Create>
            <SimpleForm>
                <TextInput source="title" aria-required label="Title"/>
                <TextInput source="imageSrc" aria-required label="Image URL"/>
            </SimpleForm>
        </Create>
    );
}