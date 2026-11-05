import { useEffect, useState } from "react";
import {
  getDistrictOptions,
  getDocumentCategoryOptions,
  getIndustryOptions,
  getJobCategoryOptions,
  getJobPositionOptions,
  getMajorOptions,
} from "../services/options.service";
import { Districts } from "../types/districtsList.type";
import {
  MajorOptionFilter,
  MajorOptionItem,
  OptionItem,
} from "../types/option.type";
export function useOptions() {
  const [districtOptions, setDistrictOptions] = useState<Districts[] | []>([]);
  const [categoryDocumentOptions, setCategoryDocumentOptions] = useState<
    Districts[] | []
  >([]);
  const [insdustryOptions, setIndustryOptions] = useState<OptionItem[] | []>(
    [],
  );
  const [jobCategoryOptions, setJobCategoryOptions] = useState<
    OptionItem[] | []
  >([]);
  const [jobPositionOptions, setJobPositionOptions] = useState<
    OptionItem[] | []
  >([]);

  const [majorOptions, setMajorOptions] = useState<MajorOptionItem[] | []>([]);

  const [majorOptionFilter, setMajorOptionFilter] = useState<MajorOptionFilter>(
    { jenjang: "" },
  );

  useEffect(() => {
    const fetch = async () => {
      const result = await getDistrictOptions();
      if (result.status !== 200) {
        return;
      }
      setDistrictOptions(result.data.data);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const result = await getIndustryOptions();
      if (result.status !== 200) {
        return;
      }
      setIndustryOptions(result.data.data);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const result = await getJobCategoryOptions();
      if (result.status !== 200) {
        return;
      }
      setJobCategoryOptions(result.data.data);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const result = await getJobPositionOptions();
      if (result.status !== 200) {
        return;
      }
      setJobPositionOptions(result.data.data);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const result = await getDocumentCategoryOptions();
      if (result.status !== 200) {
        return;
      }
      setCategoryDocumentOptions(result.data.data);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const result = await getMajorOptions(majorOptionFilter);
      if (result.status !== 200) {
        return;
      }
      setMajorOptions(result.data.data);
    };
    fetch();
  }, [majorOptionFilter]);

  const handleSetMajorOptionFilter = (filter: string) => {
    setMajorOptionFilter({ jenjang: filter });
  };

  return {
    districtOptions,
    insdustryOptions,
    jobCategoryOptions,
    jobPositionOptions,
    categoryDocumentOptions,
    majorOptions,
    handleSetMajorOptionFilter,
  };
}
