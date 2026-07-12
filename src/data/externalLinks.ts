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
    subjects: ['คณิตศาสตร์'],
    isOfficialSource: true,
    examTypes: ['สอวน. (POSN)', 'TCAS / A-Level'],
    logoUrl: ''
  }
];

export const physicsLinks: ExternalLinkItem[] = [
  {
    id: 'phys1',
    title: 'รวมข้อสอบฟิสิกส์',
    description: 'แหล่งรวมข้อสอบเก่าฟิสิกส์ (เปลี่ยนลิงก์ได้เลย)',
    url: '#',
    subjects: ['ฟิสิกส์'],
    isOfficialSource: false,
    examTypes: ['TCAS / A-Level'],
    logoUrl: ''
  }
];

export const chemistryLinks: ExternalLinkItem[] = [
  {
    id: 'chem1',
    title: 'รวมข้อสอบเคมี',
    description: 'แหล่งรวมข้อสอบเก่าเคมี (เปลี่ยนลิงก์ได้เลย)',
    url: '#',
    subjects: ['เคมี'],
    isOfficialSource: false,
    examTypes: ['TCAS / A-Level'],
    logoUrl: ''
  }
];

export const biologyLinks: ExternalLinkItem[] = [
  {
    id: 'bio1',
    title: 'รวมข้อสอบชีววิทยา',
    description: 'แหล่งรวมข้อสอบเก่าชีววิทยา (เปลี่ยนลิงก์ได้เลย)',
    url: '#',
    subjects: ['ชีววิทยา'],
    isOfficialSource: false,
    examTypes: ['TCAS / A-Level'],
    logoUrl: ''
  }
];
