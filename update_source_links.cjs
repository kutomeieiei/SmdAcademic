const fs = require('fs');

const code = `import { ExternalLinkItem } from '../types';

export const sourceLinks: ExternalLinkItem[] = [
  {
    id: 'src1',
    title: 'ณัฐชนน จริยานุรัตน์ (พี่นน)',
    description: 'สรุปเบื้อหาเคมี A-level',
    url: 'https://drive.google.com/file/d/15gXhZ4B5czuvULKXWJehpB_KAqlsezLO/view',
    tags: ['เคมี', 'A-Level', 'สรุปเนื้อหา']
  },
  {
    id: 'src2',
    title: 'สรุปเนื้อหาคณิตศาสตร์ ม.ปลาย',
    description: 'ชีทสรุปสูตรและเนื้อหาคณิตศาสตร์สำหรับเตรียมสอบ TCAS / A-Level',
    url: '#',
    tags: ['คณิตศาสตร์', 'TCAS', 'A-Level', 'สรุปสูตร']
  },
  {
    id: 'src3',
    title: 'แหล่งเรียนรู้ฟิสิกส์ออนไลน์',
    description: 'คลิปติวและเอกสารประกอบการเรียนวิชาฟิสิกส์',
    url: '#',
    tags: ['ฟิสิกส์', 'คลิปติว']
  }
];
`;

fs.writeFileSync('src/data/sourceLinks.ts', code);
