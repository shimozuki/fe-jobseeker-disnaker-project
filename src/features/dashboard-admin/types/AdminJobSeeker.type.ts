export interface AdminJobSeeker {
  profile_id: number;
  user_id: number;
  full_name: string;
  nik: string;
  email: string;
  education: string;
  experience_years: number;
  is_fresh_graduate: boolean;
  district_code: string;
  district_name: string;
  registered_at: string;
  account_status: string;
}

export interface AdminJobSeekerIndexFilter {
  search: string;
  account_status: string;
  education_level: string;
  experience: string;
  district_code: string;
  registered_from: string;
  registered_to: string;
  page: number;
  rowsPerPage: number;
  limit: number;
}

export interface AdminJobSeekerDetail {
  account: JobSeekerAccount;
  profile: JobSeekerProfile;
  preference: JobSeekerPreference;
  educations: JobSeekerEducation[];
  experiences: JobSeekerExperience[];
  documents: JobSeekerDocument[];
}

export interface JobSeekerAccount {
  user_id: number;
  full_name: string;
  nik: string;
  email: string;
  phone: string;
  status: string;
  registered_at: string;
}

export interface JobSeekerProfile {
  id: number;
  user_id: number;
  full_name: string;
  phone: string;
  date_of_birth: string | null;
  birth_place: string | null;
  gender: string | null;
  address: string | null;
  province_name: string | null;
  regency_name: string | null;
  district_code: string | null;
  village_name: string | null;
  postal_code: string | null;
  highest_education: string | null;
  headline: string | null;
  summary: string | null;
  profile_photo_url: string | null;
  portfolio_url: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  created_at: string;
  updated_at: string;
  template_code: string;
  is_fresh_graduate: boolean;
}

export interface JobSeekerPreference {
  user_id: number;
  job_field_id: number;
  job_field: string;
  industry_id: number;
  industry: string;
  preferred_positions: PreferredPosition[];
  preferred_districts: PreferredDistrict[];
  job_types: string[];
  work_arrangements: string[];
  willing_to_relocate: boolean;
  min_salary: number;
  max_salary: number;
  job_search_status: string;
  created_at: string;
  updated_at: string;
}

export interface PreferredPosition {
  id: number;
  name: string;
  display_order: number;
}

export interface PreferredDistrict {
  code: string;
  name: string;
  display_order: number;
}

export interface JobSeekerEducation {
  id: number;
  institution: string;
  degree: string;
  major: string;
  start_date: number;
  end_date: number | null;
  grade: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
  job_seeker_profile_id: number;
}

export interface JobSeekerExperience {
  id: number;
  company_name: string;
  job_title: string;
  employment_type: string;
  location: string | null;
  start_date: number;
  end_date: number | null;
  is_current: boolean;
  description: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
  job_seeker_profile_id: number;
  responsibilities: string | null;
  achievements: string | null;
}

export interface JobSeekerDocument {
  id: number;
  original_filename: string;
  category_code: string;
  category_name: string;
  file_url: string;
  mime_type: string;
  file_size_bytes: number;
  is_primary: boolean;
  created_at: string;
}

export interface AdminExportJobSeekerResult {
  FullName: string;
  NIK: string;
  Education: string;
  Gender: string;
  Age: number;
  DistrictName: string;
  PreferredDistricts: string[];
  PreferredPositions: string[];
  MinSalary: number;
  MaxSalary: number;
  JobSearchStatus: string;
}

export interface AdminExportJobSeekerFilter {
  education_level: string;
  major_id: number;
  gender: string;
  job_field_id: number | null;
  job_type: string;
  job_search_status: string;
  district_code: string;
  min_age: number | null;
  max_age: number | null;
  industry_id: number | null;
  work_arrangement: string;
  preferred_district_code: string;
  min_salary: number | null;
  max_salary: number | null;
  position_id: number | null;
  willing_to_relocate: boolean | null;
  is_fresh_graduate: boolean | null;
}

export interface AdminJobSeekerDashboardData {
  total_job_seekers: number;
  kecamatan: AdminJobSeekerDashboardDistrict[];
  wilayah_diminati: AdminJobSeekerDashboardDistrict[];
  posisi_diminati: AdminJobSeekerDashboardPosition[];
  job_fields: AdminJobSeekerDashboardJobField[];
  industri: AdminJobSeekerDashboardIndustry[];
}

export interface AdminJobSeekerDashboardDistrict {
  district_code: string;
  kecamatan: string;
  jumlah_job_seekers: number;
}

export interface AdminJobSeekerDashboardPosition {
  id: number;
  nama: string;
  jumlah_job_seekers: number;
}

export interface AdminJobSeekerDashboardJobField {
  id: number;
  nama: string;
  jumlah_job_seekers: number;
}

export interface AdminJobSeekerDashboardIndustry {
  id: number;
  nama: string;
  jumlah_job_seekers: number;
}
