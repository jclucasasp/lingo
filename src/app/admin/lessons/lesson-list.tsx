import {List, Datagrid, TextField, ReferenceField } from "react-admin";

export default function LessonList() {
    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField source="id" label="ID"/>
                <TextField source="title"  aria-required label="Title"/>
                <ReferenceField source="unitId" reference="units" label="Unit" />
                <TextField source="unitId" label="Unit ID"/>
            </Datagrid>
        </List>
    );
}