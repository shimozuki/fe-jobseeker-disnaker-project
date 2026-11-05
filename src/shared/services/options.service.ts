import axios from "axios";
import { handleServiceError } from "../utils/handleServiceError";
import API_ENDPOINTS from "../global/api_endpoints";
import { MajorOptionFilter } from "../types/option.type";

export async function getDistrictOptions() {
  try {
    const response = await axios.get(API_ENDPOINTS.OPTIONS.DISTRICTS);
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function getIndustryOptions() {
  try {
    const response = await axios.get(API_ENDPOINTS.OPTIONS.INDUSTRY);
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function getJobCategoryOptions() {
  try {
    const response = await axios.get(API_ENDPOINTS.OPTIONS.JOB_CATEGORY);
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function getJobPositionOptions() {
  try {
    const response = await axios.get(API_ENDPOINTS.OPTIONS.JOB_POSITION);
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function getDocumentCategoryOptions() {
  try {
    const response = await axios.get(API_ENDPOINTS.OPTIONS.DOCUMENT_CATEGORY);
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function getMajorOptions(filterParams: MajorOptionFilter) {
  try {
    const response = await axios.get(API_ENDPOINTS.OPTIONS.MAJOR, {
      params: filterParams,
    });
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}
