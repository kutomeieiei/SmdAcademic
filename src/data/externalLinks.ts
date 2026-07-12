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
    title: 'Rath Center Mathematics',
    description: 'รวบรวมข้อสอบคณิตศาสตร์มัธยมปลาย สมาคมคณิตศาสตร์ สอวน. และข้อสอบแข่งขันคณิตศาสตร์ต่างๆ มากมาย',
    url: 'http://www.rathcenter.com/',
    logoUrl: ''
  }
];

export const physicsLinks: ExternalLinkItem[] = [
  {
    id: 'phys1',
    title: 'รวมข้อสอบฟิสิกส์',
    description: 'แหล่งรวมข้อสอบเก่าฟิสิกส์ (เปลี่ยนลิงก์ได้เลย)',
    url: '#',
    logoUrl: ''
  }
];

export const chemistryLinks: ExternalLinkItem[] = [
  {
    id: 'chem1',
    title: 'รวมข้อสอบเคมี',
    description: 'แหล่งรวมข้อสอบเก่าเคมี (เปลี่ยนลิงก์ได้เลย)',
    url: '#',
    logoUrl: ''
  }
];

export const biologyLinks: ExternalLinkItem[] = [
  {
    id: 'bio1',
    title: 'รวมข้อสอบชีววิทยา',
    description: 'แหล่งรวมข้อสอบเก่าชีววิทยา (เปลี่ยนลิงก์ได้เลย)',
    url: '#',
    logoUrl: ''
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

