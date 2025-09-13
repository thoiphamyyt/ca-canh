"use client";
import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import TextArea from "../input/TextArea";
import {
  ChevronDownIcon,
  EyeCloseIcon,
  EyeIcon,
  TimeIcon,
} from "../../../icons";
// import DatePicker from "@/components/form/date-picker";

export default function DefaultInputs() {
  const options = [
    { value: "marketing", label: "Marketing" },
    { value: "template", label: "Template" },
    { value: "development", label: "Development" },
  ];
  const handleSelectChange = (value) => {
    console.log("Selected value:", value);
  };
  return (
    <ComponentCard title="Thêm mới sản phẩm">
      <div className="space-y-6">
        <div>
          <Label>Mã sản phẩm</Label>
          <Input type="text" />
        </div>
        <div>
          <Label>Tến sản phẩm</Label>
          <Input type="text" />
        </div>
        <div>
          <Label>Số lượng</Label>
          <Input type="text" />
        </div>
        <div>
          <Label>Đơn giá</Label>
          <Input type="text" />
        </div>
        <div>
          <Label>Đơn giá cũ</Label>
          <Input type="text" />
        </div>
        <div>
          <Label>Select Input</Label>
          <div className="relative">
            <Select
              options={options}
              placeholder="Select an option"
              onChange={handleSelectChange}
              className="dark:bg-dark-900"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
        </div>
        <div>
          <Label>Mô tả</Label>
          <TextArea rows={6} hint="Please enter a valid message." />
        </div>
      </div>
    </ComponentCard>
  );
}
