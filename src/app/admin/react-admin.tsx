"use client";
import { Admin, ListGuesser, Resource } from "react-admin";
import  jsonServerProvider from "ra-data-simple-rest";
import simpleRestProvider from "ra-data-simple-rest";


export default function ReactAdmin() {
  const dataProvider = simpleRestProvider("/api");
  // const dataProvider = jsonServerProvider("/api");

  return (
    <Admin dataProvider={dataProvider}>
        <Resource name="courses" list={ListGuesser} recordRepresentation={record => record.title} />
    </Admin>
  );
}
