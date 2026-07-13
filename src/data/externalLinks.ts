import { ExternalLinkItem } from '../types';

/**
 * คำแนะนำในการใส่โลโก้ (logoUrl):
 * - สามารถใช้ลิงก์รูปภาพทั่วไปได้ (เช่น https://example.com/logo.png)
 * - หรือใช้ลิงก์แชร์จาก Google Drive ได้โดยตรง โดยนำลิงก์แชร์มาวางได้เลย
 *   (ระบบจะแปลงลิงก์ Google Drive เป็น Direct Link แสดงผลรูปภาพให้โดยอัตโนมัติ)
 */

export const mathLinks: ExternalLinkItem[] = [
  {
    id: 'math1',
    title: 'Netsat คณิต',
    description: 'รวบรวมข้อสอบ + เฉลย Netsat คณิตปี 63-69',
    url: 'https://drive.google.com/drive/folders/1fwajz7dGyTb8_HHoEydIgs9-yvaEVe2v',
    logoUrl: 'https://drive.google.com/file/d/15Gwq5x6j-0ly7yRpnUDlOOb47_3GYwM7/view?usp=drivesdk'
  }
];

export const physicsLinks: ExternalLinkItem[] = [
  {
    id: 'phys1',
    title: 'สอวนฟิสิกส์',
    description: 'ข้อสอบสอวนค่าย1-3 + เฉลยรวบรวมโดย Tonson physics',
    url: 'https://sites.google.com/view/tonsonphysics/%E0%B8%84%E0%B8%A5%E0%B8%87%E0%B8%82%E0%B8%AD%E0%B8%AA%E0%B8%AD%E0%B8%9A/%E0%B8%82%E0%B8%AD%E0%B8%AA%E0%B8%AD%E0%B8%9A%E0%B9%82%E0%B8%AD%E0%B8%A5%E0%B8%A1%E0%B8%9B%E0%B8%81%E0%B8%9F%E0%B8%AA%E0%B8%81%E0%B8%AA?authuser=0',
    logoUrl: 'https://drive.google.com/file/d/1TSjLLBWd6XAXlaJDTgpv5eHyfklc8VUg/view?usp=drivesdk'
  }
];

export const chemistryLinks: ExternalLinkItem[] = [
  {
    id: 'chem1',
    title: 'Netsat เคมี',
    description: 'รวบรวมข้อสอบ Netsat เคมี',
    url: 'https://drive.google.com/drive/folders/15dw6GeKzyOIckCsiERm7mfTeLhnDb6Kp',
    logoUrl: 'https://drive.google.com/file/d/15Gwq5x6j-0ly7yRpnUDlOOb47_3GYwM7/view?usp=drivesdk'
  }
];

export const biologyLinks: ExternalLinkItem[] = [
  {
    id: 'bio1',
    title: 'สอวนชีววิทยา',
    description: 'ข้อสอบ + เฉลยทำโดย bioloomaa',
    url: 'https://drive.google.com/drive/folders/1qnTWkv1x6XRSNXOiPdkfEgafqJ3bUdWQ',
    logoUrl: 'https://drive.google.com/file/d/1TSjLLBWd6XAXlaJDTgpv5eHyfklc8VUg/view?usp=drivesdk'
  }
];

export const englishLinks: ExternalLinkItem[] = [
  {
    id: 'eng1',
    title: 'ข้อสอบ A-level อังกฤษ',
    description: 'A-level Eng 55-68 พร้อมเฉลยรวบรวมทำโดย PMooktutor',
    url: 'https://drive.google.com/drive/folders/1_q8-8vlr3xay0hRvMzsv5dkuYDIV8kAi',
    logoUrl: 'https://drive.google.com/file/d/1iWHLZN8oUCwcbDpVD6h1wc2cVJCpU8-9/view?usp=drive_link'
  }
];