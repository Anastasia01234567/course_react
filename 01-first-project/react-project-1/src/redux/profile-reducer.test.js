import React from "react";
import {addPostCreateAction, profileReducer} from "./profile-reducer";
import { render } from '@testing-library/react';
import {describe, expect, test} from '@jest/globals';
test("length of posts should be increments", () => {
   let action = addPostCreateAction('it-ie');
   let state = {
       posts:
           [
               {id: 1, message: "Nastya1", likesCount: 12},
               {id: 2, message: "Sergey1", likesCount: 13},
               {id: 2, message: "Sergey2", likesCount: 14},
               {id: 2, message: "Sergey3", likesCount: 15}
           ]
   };
   let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(5);
});


