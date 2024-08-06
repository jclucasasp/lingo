"use client";
import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
// import jsonServerProvider from "ra-data-simple-rest";
import CourseList from "@/app/admin/course/course-list";
import CreateCourse from "@/app/admin/course/course-create";
import EditCourse from "@/app/admin/course/course-edit";
import UnitList from "@/app/admin/units/unit-list";
import EditUnit from "@/app/admin/units/unit-edit";
import CreateUnit from "@/app/admin/units/unit-create";


export default function ReactAdmin() {
  const dataProvider = simpleRestProvider("/api");
  // const dataProvider = jsonServerProvider("/api");
  // ListGuesser from react-admin automatically guesses the headers and fileds of the table

  return (
    <Admin dataProvider={dataProvider}>
        <Resource name="courses" list={CourseList} 
        recordRepresentation={record => record.title}  
        create={CreateCourse}
        edit={EditCourse}
        />
        <Resource name="units" list={UnitList} 
        recordRepresentation={record => record.title} 
        create={CreateUnit}
        edit={EditUnit}
        />
    </Admin>
  );
}
