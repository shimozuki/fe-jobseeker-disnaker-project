export interface OptionItem {
  id: number;
  name: string;
}

export interface MajorOptionItem {
  id: number;
  nama_jurusan: string;
  jenjang: string | null;
}

export interface MajorOptionFilter {
  jenjang: string;
}
