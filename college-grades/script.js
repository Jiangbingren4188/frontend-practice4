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

// ============================================================
// Step 2：清洗与统计函数
// 设计原则：每个函数只做一件事（职责单一），纯函数无副作用
// 使用方法：filter 清洗、reduce 聚合、map 转换
// ============================================================

// 清洗：过滤非法成绩（非数字 / 负数 / 超过满分 100）
// 输入：原始成绩数组；输出：仅含合法成绩的数组
const cleanGrades = (list) => {
  if (!Array.isArray(list)) return [];
  return list.filter(s =>
    typeof s.score === 'number' &&
    !Number.isNaN(s.score) &&
    s.score >= 0 &&
    s.score <= 100
  );
};

// 统计平均分：reduce 累加总成绩，返回保留两位小数的数字
// 输入：清洗后的数组；输出：平均分（数字，非字符串）
const averageScore = (list) => {
  if (list.length === 0) return 0;
  const total = list.reduce((sum, s) => sum + s.score, 0);
  return Math.round((total / list.length) * 100) / 100;
};

// 统计加权 GPA：按学分加权，4.0 制
// 输入：清洗后的数组；输出：GPA（保留两位小数）
// 映射：90~100→4.0, 80~89→3.0, 70~79→2.0, 60~69→1.0, <60→0
const weightedGPA = (list) => {
  if (list.length === 0) return 0;
  const totalCredit = list.reduce((sum, s) => sum + s.credit, 0);
  if (totalCredit === 0) return 0;
  const toPoint = (score) => {
    if (score >= 90) return 4.0;
    if (score >= 80) return 3.0;
    if (score >= 70) return 2.0;
    if (score >= 60) return 1.0;
    return 0;
  };
  const weightedSum = list.reduce((sum, s) => sum + toPoint(s.score) * s.credit, 0);
  return Math.round((weightedSum / totalCredit) * 100) / 100;
};

// 列出不及格（<60）的课程清单
// 输入：清洗后的数组；输出：[{ name, course, score }] 形式
const failedList = (list) =>
  list
    .filter(s => s.score < 60)
    .map(s => ({ name: s.name, course: s.course, score: s.score }));

// 取最高分记录（按分数比较）
// 输入：清洗后的数组；输出：单个成绩对象
const topGrade = (list) =>
  list.reduce((max, s) => s.score > max.score ? s : max, list[0]);

// —— 测试输出 ——
const valid = cleanGrades(grades);
console.log('清洗后合法成绩：', valid);
console.log('清洗掉记录数：', grades.length - valid.length);
console.log('平均分：', averageScore(valid));
console.log('加权 GPA：', weightedGPA(valid));
console.log('不及格清单：', failedList(valid));
console.log('最高分记录：', topGrade(valid));
