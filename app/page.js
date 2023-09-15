"use client";
import React, { useState } from "react";
import UpdateContestsButton from './UpdateContestsButton';
import UpdateConcursosButton from "./UpdateConcursosButton";

export default function Page() {
    return (
        <main>
        
        <div class="p-2 flex">
            <div class="w-1/4 text-3xl">List of Contests for Short Stories in English & Spanish</div>
            <div class="flex justify-end">
                <div class="m-20 mr-20">
            <UpdateContestsButton />
                </div>
                <div class="m-20">
            <UpdateConcursosButton />
            </div>
        </div>
</div>


        
        </main>
        
    );
}
