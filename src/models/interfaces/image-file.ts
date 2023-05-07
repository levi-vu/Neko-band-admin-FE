import { RcFile } from "antd/es/upload";

export interface ImageFile extends RcFile {
    url: string;
}