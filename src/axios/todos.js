import React from "react";
import axios from "axios";

export const getTodos = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_JSON_SERVER_URL}/todos`
    );
    console.log("받아온 데이터", response);
    return response;
  } catch (error) {
    console.log(`데이터 불러오기 실패`, error);
  }
};
