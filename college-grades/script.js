// ============================================================
// 大学生成绩统计 - Step 1：成绩数据定义
// 字段说明：
//   name   学生姓名
//   course 课程名称
//   credit 学分
//   score  百分制成绩（合法范围 0 ~ 100）
// 数据中故意混入若干非法值，用于后续清洗演示
// ============================================================

const grades = [
  { name: '张明', course: '高等数学', credit: 4, score: 88 },
  { name: '张明', course: '大学英语', credit: 3, score: 76 },
  { name: '李华', course: '高等数学', credit: 4, score: 92 },
  { name: '李华', course: '大学英语', credit: 3, score: 58 },
  { name: '王芳', course: '高等数学', credit: 4, score: 105 },  // 非法：超过满分 100
  { name: '王芳', course: '大学英语', credit: 3, score: -5 },   // 非法：负分
  { name: '赵强', course: '数据结构', credit: 3, score: 81 },
  { name: '赵强', course: '操作系统', credit: 3, score: 67 },
  { name: '孙伟', course: '数据结构', credit: 3, score: 95 },
  { name: '孙伟', course: '操作系统', credit: 3, score: '缺考' } // 非法：非数字
];

console.log('原始成绩数据：', grades);
