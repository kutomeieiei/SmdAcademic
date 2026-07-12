import { ExternalLinkItem } from '../types';

export const sourceLinks: ExternalLinkItem[] = [
  {
    id: 'src1',
    title: 'เอกสารประกอบการเรียน สอวน.',
    description: 'เอกสารและชีทสรุปสำหรับเตรียมตัวสอบ สอวน. จากศูนย์ต่างๆ',
    url: '#',
    subjects: ['รวมทุกวิชา'],
    isOfficialSource: false,
    examTypes: ['สอวน. (POSN)'],
    logoUrl: '' 
  },
  {
    id: 'src2',
    title: 'สรุปเนื้อหาคณิตศาสตร์ ม.ปลาย',
    description: 'ชีทสรุปสูตรและเนื้อหาคณิตศาสตร์สำหรับเตรียมสอบ TCAS / A-Level',
    url: '#',
    subjects: ['คณิตศาสตร์'],
    isOfficialSource: false,
    examTypes: ['TCAS / A-Level'],
    logoUrl: '' 
  },
  {
    id: 'src3',
    title: 'แหล่งเรียนรู้ฟิสิกส์ออนไลน์',
    description: 'คลิปติวและเอกสารประกอบการเรียนวิชาฟิสิกส์',
    url: '#',
    subjects: ['ฟิสิกส์'],
    isOfficialSource: false,
    examTypes: ['TCAS / A-Level'],
    logoUrl: '' 
  }
];
