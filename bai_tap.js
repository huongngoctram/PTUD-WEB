
// BÀI 1: Sinh mảng ngẫu nhiên 20 phần tử, giá trị 1–100

function generateArray() {
  const arr = [];
  for (let i = 0; i < 20; i++) {
    arr.push(Math.floor(Math.random() * 100) + 1);
  }
  return arr;
}


// BÀI 2: Tính tổng mảng

function calcSum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) sum += arr[i];
  return sum;
}


// BÀI 3: Sắp xếp tăng dần (Bubble Sort)

function sortArray(arr) {
  const a = [...arr];
  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
    }
  }
  return a;
}


// BÀI 4: Tìm kiếm nhị phân (BinSearch)

function binSearch(arr, x) {
  let lo = 0, hi = arr.length - 1, steps = 0;
  const path = [];
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    steps++;
    path.push(mid);
    if (arr[mid] === x) return { found: true, index: mid, steps, path };
    else if (arr[mid] < x) lo = mid + 1;
    else hi = mid - 1;
  }
  return { found: false, index: -1, steps, path };
}


// BÀI 5: Xác định tứ phân vị của x

function getQuartile(sortedArr, x) {
  // Chia mảng 20 phần tử thành 4 phần, mỗi phần 5 phần tử
  if (x <= sortedArr[4])  return { q: 1, range: `${sortedArr[0]}–${sortedArr[4]}` };
  if (x <= sortedArr[9])  return { q: 2, range: `${sortedArr[5]}–${sortedArr[9]}` };
  if (x <= sortedArr[14]) return { q: 3, range: `${sortedArr[10]}–${sortedArr[14]}` };
  return { q: 4, range: `${sortedArr[15]}–${sortedArr[19]}` };
}


// BÀI 6: Shuffle – Fisher-Yates

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}


// BÀI 7: Tính các chỉ số thống kê

function computeStats(arr) {
  const n = arr.length;
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const mean = arr.reduce((s, v) => s + v, 0) / n;
  const sorted = [...arr].sort((a, b) => a - b);
  const median = n % 2 === 0
    ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
    : sorted[Math.floor(n / 2)];
  const variance = arr.reduce((s, v) => s + (v - mean) ** 2, 0) / n;
  const std = Math.sqrt(variance);
  return { min, max, mean, median, variance, std };
}


// BÀI 8: Histogram – chia [min, max] thành 10 khoảng đều

function histogram(arr, bins = 10) {
  const mn = Math.min(...arr), mx = Math.max(...arr);
  const step = (mx - mn) / bins;
  const counts = Array(bins).fill(0);
  const ranges = Array.from({ length: bins }, (_, i) => ({
    from: mn + i * step,
    to:   mn + (i + 1) * step
  }));
  for (const v of arr) {
    let b = Math.min(Math.floor((v - mn) / step), bins - 1);
    counts[b]++;
  }
  return { counts, ranges };
}

// BÀI 9: Loại bỏ 10% outliers – loại phần tử xa mean nhất

function removeOutliers(arr, pct = 0.1) {
  const { mean } = computeStats(arr);
  const toRemove = Math.round(arr.length * pct); // = 2
  const indexed = arr.map((v, i) => ({ v, i, dist: Math.abs(v - mean) }));
  indexed.sort((a, b) => b.dist - a.dist);
  const outlierIdx = new Set(indexed.slice(0, toRemove).map(x => x.i));
  return {
    kept:     arr.filter((_, i) => !outlierIdx.has(i)),
    outliers: arr.filter((_, i) =>  outlierIdx.has(i)),
    outlierIdx,
    mean
  };
}

// BÀI 10: Kiểm tra xấp xỉ Normal Distribution

function checkNormal(arr) {
  const { mean, std, median } = computeStats(arr);
  const n = arr.length;
  const within1 = arr.filter(v => Math.abs(v - mean) <= std).length / n * 100;
  const within2 = arr.filter(v => Math.abs(v - mean) <= 2 * std).length / n * 100;
  const skew    = arr.reduce((s, v) => s + ((v - mean) / std) ** 3, 0) / n;
  const kurt    = arr.reduce((s, v) => s + ((v - mean) / std) ** 4, 0) / n - 3;
  const symm    = Math.abs(mean - median) / (std || 1);

  let score = 0;
  if (within1 >= 55 && within1 <= 80) score += 2; else if (within1 >= 50) score += 1;
  if (within2 >= 85) score += 2; else if (within2 >= 75) score += 1;
  if (Math.abs(skew) < 0.5) score += 2; else if (Math.abs(skew) < 1) score += 1;
  if (Math.abs(kurt) < 1) score += 1;
  if (symm < 0.2) score += 1;

  const verdict = score >= 6 ? 'Gần chuẩn' : score >= 4 ? 'Tương đối' : 'Chưa chuẩn';
  return { within1, within2, skew, kurt, symm, score, maxScore: 8, verdict };
}


// IN KẾT QUẢ RA GIAO DIỆN

function section(num, title, lines) {
  const out = document.getElementById('output');
  const div = document.createElement('div');
  div.className = 'sec';
  div.innerHTML = `<b>Bài ${num}: ${title}</b><br>${lines.join('<br>')}`;
  out.appendChild(div);
}

function run() {
  document.getElementById('output').innerHTML = '';

  // Bài 1
  const arr = generateArray();
  section(1, 'Mảng ngẫu nhiên', [
    `arr = [${arr.join(', ')}]`
  ]);

  // Bài 2
  section(2, 'Tổng các phần tử', [
    `sum = ${calcSum(arr)}`
  ]);

  // Bài 3
  const sorted = sortArray(arr);
  section(3, 'Sắp xếp tăng dần (Bubble Sort)', [
    `sorted = [${sorted.join(', ')}]`
  ]);

  // Bài 4
  const x4 = parseInt(document.getElementById('x-search').value) || 42;
  const res = binSearch(sorted, x4);
  section(4, `Tìm kiếm nhị phân: x = ${x4}`, [
    res.found
      ? `Tìm thấy: index = ${res.index}, giá trị = ${sorted[res.index]}, số bước = ${res.steps}`
      : `Không tìm thấy x = ${x4} sau ${res.steps} bước`,
    `Các index đã so sánh: [${res.path.join(' → ')}]`
  ]);

  // Bài 5
  const x5 = parseInt(document.getElementById('x-quartile').value) || 50;
  const qr = getQuartile(sorted, x5);
  section(5, `Tứ phân vị của x = ${x5}`, [
    `Q1 = [${sorted[0]}–${sorted[4]}]  Q2 = [${sorted[5]}–${sorted[9]}]  Q3 = [${sorted[10]}–${sorted[14]}]  Q4 = [${sorted[15]}–${sorted[19]}]`,
    `x = ${x5} thuộc Q${qr.q} (khoảng ${qr.range})`
  ]);

  // Bài 6
  const shuffled = shuffle(sorted);
  section(6, 'Shuffle (Fisher-Yates)', [
    `Trước: [${sorted.join(', ')}]`,
    `Sau:   [${shuffled.join(', ')}]`
  ]);

  // Bài 7
  const st = computeStats(arr);
  section(7, 'Chỉ số thống kê', [
    `Min      = ${st.min}`,
    `Max      = ${st.max}`,
    `Mean     = ${st.mean.toFixed(4)}`,
    `Median   = ${st.median}`,
    `Variance = ${st.variance.toFixed(4)}`,
    `Std Dev  = ${st.std.toFixed(4)}`
  ]);

  // Bài 8
  const hist = histogram(arr, 10);
  const histLines = hist.counts.map((c, i) => {
    const bar = '|'.repeat(c) || '·';
    return `[${Math.round(hist.ranges[i].from).toString().padStart(3)}–${Math.round(hist.ranges[i].to).toString().padStart(3)}]: ${bar} (${c})`;
  });
  section(8, 'Histogram (10 khoảng)', histLines.map(l => `<code>${l}</code>`));

  // Bài 9
  const out9 = removeOutliers(arr, 0.1);
  section(9, 'Loại bỏ 10% Outliers', [
    `Mean = ${out9.mean.toFixed(2)}`,
    `Mảng gốc:  [${arr.join(', ')}]`,
    `Outliers:  [${out9.outliers.join(', ')}]`,
    `Còn lại (${out9.kept.length} phần tử): [${out9.kept.join(', ')}]`
  ]);

  // Bài 10
  const norm = checkNormal(arr);
  section(10, 'Kiểm tra Normal Distribution', [
    `Trong ±1σ: ${norm.within1.toFixed(1)}%  (chuẩn ~68%)`,
    `Trong ±2σ: ${norm.within2.toFixed(1)}%  (chuẩn ~95%)`,
    `Trong ±3σ: ${norm.within3.toFixed(1)}%  (chuẩn ~99.7%)`,
    `Skewness:  ${norm.skew.toFixed(4)}  (lý tưởng ≈ 0)`,
    `Kurtosis:  ${norm.kurt.toFixed(4)}  (lý tưởng ≈ 0)`,
    `|Mean−Median|/σ: ${norm.symm.toFixed(4)}  (lý tưởng < 0.2)`,
    `Điểm: ${norm.score}/${norm.maxScore} → <b>${norm.verdict}</b>`,
  ]);
}