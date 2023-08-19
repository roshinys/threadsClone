"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";

function SendMessage() {
  const [search, setSearch] = useState("");
  return (
    <section className="bottombar">
      <div className="bottombar_container">
        <Input
          id="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter Text"
          className="no-focus searchbar_input text-light-2"
        />
      </div>
    </section>
  );
}

export default SendMessage;
