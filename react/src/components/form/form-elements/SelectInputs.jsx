"use client";
import React, { useState } from "react";
import Label from "../Label";
import Select from "../Select";
import { ChevronDownIcon } from "@/icons";

export default function SelectInputs({ listData = [] }) {
  const handleSelectChange = (value) => {
    // console.log("Selected value:", value);
  };
  return (
    <div>
      <Label>Select Input</Label>
      <div className="relative">
        <Select
          options={listData}
          placeholder="Select Option"
          onChange={handleSelectChange}
          className="dark:bg-dark-900"
        />
        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
          <ChevronDownIcon />
        </span>
      </div>
    </div>
  );
}
