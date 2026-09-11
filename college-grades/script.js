const grades = [
  { name: '张明', course: '高等数学', credit: 4, score: 88 },
  { name: '张明', course: '大学英语', credit: 3, score: 76 },
  { name: '李华', course: '高等数学', credit: 4, score: 92 },
  { name: '李华', course: '大学英语', credit: 3, score: 58 },
  { name: '王芳', course: '高等数学', credit: 4, score: 105 },
  { name: '王芳', course: '大学英语', credit: 3, score: -5 },
  { name: '赵强', course: '数据结构', credit: 3, score: 81 },
  { name: '赵强', course: '操作系统', credit: 3, score: 67 },
  { name: '孙伟', course: '数据结构', credit: 3, score: 95 },
  { name: '孙伟', course: '操作系统', credit: 3, score: '缺考' }
];

console.log('原始成绩数据：', grades);

const cleanGrades = (list) => {
  if (!Array.isArray(list)) return [];
  return list.filter(s =>
    typeof s.score === 'number' &&
    !Number.isNaN(s.score) &&
    s.score >= 0 &&
    s.score <= 100
  );
};

const averageScore = (list) => {
  if (list.length === 0) return 0;
  const total = list.reduce((sum, s) => sum + s.score, 0);
  return Math.round((total / list.length) * 100) / 100;
};

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

const failedList = (list) =>
  list
    .filter(s => s.score < 60)
    .map(s => ({ name: s.name, course: s.course, score: s.score }));

const topGrade = (list) =>
  list.reduce((max, s) => s.score > max.score ? s : max, list[0]);

const valid = cleanGrades(grades);
console.log('清洗后合法成绩：', valid);
console.log('清洗掉记录数：', grades.length - valid.length);
console.log('平均分：', averageScore(valid));
console.log('加权 GPA：', weightedGPA(valid));
console.log('不及格清单：', failedList(valid));
console.log('最高分记录：', topGrade(valid));

const toLetterGrade = (score) => {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
};

const gradeDistribution = (list) =>
  list.reduce(
    (acc, s) => {
      acc[toLetterGrade(s.score)]++;
      return acc;
    },
    { A: 0, B: 0, C: 0, D: 0, F: 0 }
  );

const formatLine = (s) =>
  `  - ${s.name} ${s.course}(${s.credit}学分) ${s.score} [${toLetterGrade(s.score)}]`;

const buildReport = (list) => {
  if (!Array.isArray(list) || list.length === 0) {
    return '没有有效成绩，无法生成报告。';
  }
  const dist = gradeDistribution(list);
  const top = topGrade(list);
  const avg = averageScore(list);
  const gpa = weightedGPA(list);
  const failed = failedList(list);

  const lines = [
    '========== 大学成绩统计报告 ==========',
    `有效记录：${list.length} 条`,
    `平均分：${avg}　加权 GPA：${gpa}`,
    `最高分：${top.score}（${top.name}・${top.course}）`,
    `等级分布：A ${dist.A}人 | B ${dist.B}人 | C ${dist.C}人 | D ${dist.D}人 | F ${dist.F}人`,
    '── 成绩明细 ──',
    ...list.map(formatLine),
    '── 不及格清单 ──',
    failed.length === 0
      ? '  无'
      : failed.map(f => `  - ${f.name} ${f.course} ${f.score}分`).join('\n'),
    '========================================'
  ];
  return lines.join('\n');
};

try {
  console.log(buildReport(valid));
} catch (err) {
  console.error('报告生成失败：', err.message);
}
