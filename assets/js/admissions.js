/* ==========================================================================
   Govt. Graduate College Hafizabad - Admissions, Merit & Challan Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMeritCalculator();
  initAdmissionWizard();
  initChallanGenerator();
});

// 1. Merit Calculator Logic
function initMeritCalculator() {
  const calcForm = document.getElementById('merit-calc-form');
  if (!calcForm) return;

  calcForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const matricObt = parseFloat(document.getElementById('calc-matric-obt').value) || 0;
    const matricTotal = parseFloat(document.getElementById('calc-matric-total').value) || 1100;
    
    const interObt = parseFloat(document.getElementById('calc-inter-obt').value) || 0;
    const interTotal = parseFloat(document.getElementById('calc-inter-total').value) || 1100;

    const isHafiz = document.getElementById('calc-hafiz')?.checked || false;

    if (matricObt > matricTotal || interObt > interTotal || matricObt <= 0 || interObt <= 0) {
      showToast('Please enter valid matric and intermediate marks.', 'error');
      return;
    }

    // Formula: (Matric % * 0.30) + (Inter % * 0.70) + (Hafiz-e-Quran weight: +20 marks added to inter or 1.5% boost)
    const matricWeight = (matricObt / matricTotal) * 30;
    let adjustedInterObt = interObt + (isHafiz ? 20 : 0);
    const interWeight = (Math.min(adjustedInterObt, interTotal) / interTotal) * 70;
    const totalAggregate = (matricWeight + interWeight).toFixed(2);

    const resultBox = document.getElementById('merit-result-box');
    const resultScore = document.getElementById('merit-score');
    const resultBreakdown = document.getElementById('merit-breakdown');
    const eligibleProgramsEl = document.getElementById('eligible-programs-list');

    if (resultBox && resultScore) {
      resultScore.innerText = `${totalAggregate}%`;
      resultBreakdown.innerHTML = `
        <div class="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-300 mt-2">
          <div>Matric Component (30%): <strong>${matricWeight.toFixed(2)}%</strong></div>
          <div>Inter Component (70%): <strong>${interWeight.toFixed(2)}%</strong></div>
          ${isHafiz ? '<div class="col-span-2 text-emerald-600 font-semibold"><i class="fas fa-check-circle"></i> +20 Marks applied for Hafiz-e-Quran</div>' : ''}
        </div>
      `;

      // Program Recommendations based on expected merit thresholds
      let recommendations = [];
      if (totalAggregate >= 78) {
        recommendations.push("BS Computer Science", "BS Mathematics", "BS Physics", "BS English");
      } else if (totalAggregate >= 65) {
        recommendations.push("BS Chemistry", "BS Botany", "BS Zoology", "BS Economics");
      } else if (totalAggregate >= 50) {
        recommendations.push("BS Urdu", "BS Islamic Studies", "Associate Degree in Science (ADS)", "Associate Degree in Arts (ADA)");
      } else {
        recommendations.push("Associate Degree in Arts (ADA)", "Evening Self-Finance Programs");
      }

      if (eligibleProgramsEl) {
        eligibleProgramsEl.innerHTML = recommendations.map(p => 
          `<span class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-semibold">
            <i class="fas fa-graduation-cap"></i> ${p}
          </span>`
        ).join(' ');
      }

      resultBox.classList.remove('hidden');
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      showToast(`Merit calculated: ${totalAggregate}%`, 'success');
    }
  });
}

// 2. Multi-Step Admission Form Wizard
let currentAdmissionStep = 1;
const admissionData = {};

function initAdmissionWizard() {
  const wizardForm = document.getElementById('admission-wizard-form');
  if (!wizardForm) return;

  window.nextAdmissionStep = function(step) {
    if (!validateCurrentStep(currentAdmissionStep)) return;

    // Collect data from current step
    collectStepData(currentAdmissionStep);

    document.getElementById(`step-content-${currentAdmissionStep}`).classList.add('hidden');
    document.getElementById(`step-indicator-${currentAdmissionStep}`).classList.remove('bg-emerald-700', 'text-white');
    document.getElementById(`step-indicator-${currentAdmissionStep}`).classList.add('bg-emerald-100', 'text-emerald-800');

    currentAdmissionStep = step;

    document.getElementById(`step-content-${currentAdmissionStep}`).classList.remove('hidden');
    document.getElementById(`step-indicator-${currentAdmissionStep}`).classList.add('bg-emerald-700', 'text-white');

    if (currentAdmissionStep === 4) {
      renderApplicationSummary();
    }
  };

  window.prevAdmissionStep = function(step) {
    document.getElementById(`step-content-${currentAdmissionStep}`).classList.add('hidden');
    currentAdmissionStep = step;
    document.getElementById(`step-content-${currentAdmissionStep}`).classList.remove('hidden');
  };

  wizardForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const appNo = 'GGC-' + Math.floor(100000 + Math.random() * 900000);
    admissionData.applicationNumber = appNo;
    admissionData.submissionDate = new Date().toLocaleDateString('en-GB');

    renderPrintableApplication(admissionData);
    showToast(`Application #${appNo} submitted successfully!`, 'success', 5000);
  });
}

function validateCurrentStep(step) {
  const stepContainer = document.getElementById(`step-content-${step}`);
  const requiredInputs = stepContainer.querySelectorAll('[required]');
  let valid = true;

  requiredInputs.forEach(input => {
    if (!input.value.trim()) {
      valid = false;
      input.classList.add('border-red-500');
    } else {
      input.classList.remove('border-red-500');
    }
  });

  if (!valid) {
    showToast('Please fill out all mandatory fields before proceeding.', 'warning');
  }
  return valid;
}

function collectStepData(step) {
  const container = document.getElementById(`step-content-${step}`);
  const inputs = container.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    if (input.name) {
      admissionData[input.name] = input.value;
    }
  });
}

function renderApplicationSummary() {
  const summaryEl = document.getElementById('application-review-summary');
  if (!summaryEl) return;

  collectStepData(3);

  summaryEl.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border">
      <div><span class="text-gray-500">Applicant Name:</span> <strong>${admissionData.fullName || 'N/A'}</strong></div>
      <div><span class="text-gray-500">Father's Name:</span> <strong>${admissionData.fatherName || 'N/A'}</strong></div>
      <div><span class="text-gray-500">CNIC / B-Form:</span> <strong>${admissionData.cnic || 'N/A'}</strong></div>
      <div><span class="text-gray-500">Contact Mobile:</span> <strong>${admissionData.phone || 'N/A'}</strong></div>
      <div><span class="text-gray-500">Matric Marks:</span> <strong>${admissionData.matricObt || 0} / ${admissionData.matricTotal || 1100}</strong></div>
      <div><span class="text-gray-500">Intermediate Marks:</span> <strong>${admissionData.interObt || 0} / ${admissionData.interTotal || 1100}</strong></div>
      <div class="md:col-span-2 text-emerald-800 dark:text-emerald-300 font-bold border-t pt-2 mt-1">
        Selected Program: ${admissionData.appliedProgram || 'BS Computer Science'}
      </div>
    </div>
  `;
}

function renderPrintableApplication(data) {
  const container = document.getElementById('admission-wizard-container');
  if (!container) return;

  container.innerHTML = `
    <div class="printable-area bg-white text-gray-900 p-8 rounded-2xl shadow-xl border-2 border-emerald-800">
      <div class="flex items-center justify-between border-b-2 border-emerald-900 pb-4 mb-6">
        <div class="flex items-center gap-4">
          <img src="assets/images/logo.svg" alt="GGC Hafizabad Crest" class="w-20 h-20">
          <div>
            <h2 class="text-xl font-black text-emerald-900 tracking-wide uppercase">Govt. Graduate College Hafizabad</h2>
            <p class="text-xs text-gray-600 font-semibold">Affiliated with University of the Punjab & BISE Gujranwala</p>
            <p class="text-xs text-gray-500">Online Admission Application Form (Session 2026-2030)</p>
          </div>
        </div>
        <div class="text-right">
          <span class="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 font-mono font-bold text-sm rounded">
            APP NO: ${data.applicationNumber}
          </span>
          <div class="text-xs text-gray-500 mt-1">Date: ${data.submissionDate}</div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-y-3 gap-x-6 text-sm mb-6 border-b pb-6">
        <div><strong>Applicant Name:</strong> ${data.fullName}</div>
        <div><strong>Father's Name:</strong> ${data.fatherName}</div>
        <div><strong>CNIC / B-Form:</strong> ${data.cnic}</div>
        <div><strong>Date of Birth:</strong> ${data.dob}</div>
        <div><strong>Contact Mobile:</strong> ${data.phone}</div>
        <div><strong>Email Address:</strong> ${data.email || 'N/A'}</div>
        <div><strong>District of Domicile:</strong> ${data.domicile || 'Hafizabad'}</div>
        <div><strong>Permanent Address:</strong> ${data.address || 'Hafizabad'}</div>
      </div>

      <h4 class="font-bold text-emerald-900 text-sm mb-2 uppercase">Academic Record</h4>
      <table class="w-full text-xs text-left border mb-6">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th class="p-2 border">Certificate / Exam</th>
            <th class="p-2 border">Board</th>
            <th class="p-2 border">Roll Number</th>
            <th class="p-2 border">Obtained / Total</th>
            <th class="p-2 border">Percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-2 border font-semibold">SSC (Matric)</td>
            <td class="p-2 border">${data.matricBoard || 'BISE Gujranwala'}</td>
            <td class="p-2 border">${data.matricRoll || '-'}</td>
            <td class="p-2 border">${data.matricObt} / ${data.matricTotal}</td>
            <td class="p-2 border font-bold">${((data.matricObt / data.matricTotal) * 100).toFixed(1)}%</td>
          </tr>
          <tr>
            <td class="p-2 border font-semibold">HSSC (Intermediate)</td>
            <td class="p-2 border">${data.interBoard || 'BISE Gujranwala'}</td>
            <td class="p-2 border">${data.interRoll || '-'}</td>
            <td class="p-2 border">${data.interObt} / ${data.interTotal}</td>
            <td class="p-2 border font-bold">${((data.interObt / data.interTotal) * 100).toFixed(1)}%</td>
          </tr>
        </tbody>
      </table>

      <div class="bg-emerald-50 border border-emerald-200 p-4 rounded-lg mb-6">
        <div class="text-xs uppercase font-bold text-emerald-800">Applied Discipline:</div>
        <div class="text-lg font-bold text-emerald-950">${data.appliedProgram}</div>
      </div>

      <div class="flex justify-between items-end pt-8 mt-4 border-t text-xs">
        <div class="text-center w-48 border-t border-gray-400 pt-2">
          Applicant's Signature
        </div>
        <div class="text-center w-48 border-t border-gray-400 pt-2">
          Admission Committee Incharge
        </div>
        <div class="text-center w-48 border-t border-gray-400 pt-2">
          Principal's Office
        </div>
      </div>

      <div class="mt-8 pt-4 border-t flex items-center justify-between no-print">
        <button onclick="window.print()" class="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-lg flex items-center gap-2">
          <i class="fas fa-print"></i> Print Application Slip
        </button>
        <button onclick="generateChallanFromApp()" class="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold rounded-xl shadow-lg flex items-center gap-2">
          <i class="fas fa-file-invoice-dollar"></i> Generate Bank Fee Challan
        </button>
      </div>
    </div>
  `;
}

window.generateChallanFromApp = function() {
  const modal = document.getElementById('challan-modal');
  if (modal) {
    modal.classList.add('active');
    populateChallan(admissionData.fullName || 'Student Applicant', admissionData.applicationNumber || 'GGC-786110', admissionData.appliedProgram || 'BS Computer Science');
  }
};

// 3. Official Bank Fee Challan Generator
function initChallanGenerator() {
  const form = document.getElementById('challan-generator-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('challan-student-name').value;
    const rollNo = document.getElementById('challan-roll-no').value;
    const program = document.getElementById('challan-program').value;

    populateChallan(name, rollNo, program);
    document.getElementById('challan-modal')?.classList.add('active');
  });
}

function populateChallan(studentName, rollNo, program) {
  const challanOutput = document.getElementById('challan-printable-content');
  if (!challanOutput) return;

  const challanNo = 'CH-' + Math.floor(100000 + Math.random() * 900000);
  const issueDate = new Date().toLocaleDateString('en-GB');
  const dueDate = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB');

  const copies = [
    { title: "BANK COPY", note: "To be retained by receiving branch" },
    { title: "COLLEGE COPY", note: "Submit to GGC Hafizabad Accounts Office" },
    { title: "STUDENT COPY", note: "To be preserved by candidate" }
  ];

  challanOutput.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
      ${copies.map(copy => `
        <div class="border-2 border-dashed border-emerald-800 p-3 rounded-lg bg-white text-gray-900 flex flex-col justify-between">
          <div>
            <div class="text-center border-b pb-2 mb-2">
              <div class="font-bold text-xs uppercase text-emerald-900">Govt. Graduate College Hafizabad</div>
              <div class="text-[10px] text-gray-600">National Bank of Pakistan (NBP) Main Br. Hafizabad</div>
              <div class="text-[10px] text-gray-600">Account No: <strong>01420040582910</strong></div>
              <div class="inline-block px-2 py-0.5 mt-1 bg-emerald-100 text-emerald-900 font-bold rounded text-[10px]">${copy.title}</div>
            </div>

            <div class="space-y-1 mb-3 text-[11px]">
              <div><strong>Challan No:</strong> ${challanNo}</div>
              <div><strong>Issue Date:</strong> ${issueDate}</div>
              <div class="text-red-600 font-bold"><strong>Due Date:</strong> ${dueDate}</div>
              <div class="border-t pt-1"><strong>Student:</strong> ${studentName}</div>
              <div><strong>Roll/App No:</strong> ${rollNo}</div>
              <div><strong>Program:</strong> ${program}</div>
            </div>

            <table class="w-full text-left border-collapse text-[10px] border mb-2">
              <thead>
                <tr class="bg-gray-100 border-b">
                  <th class="p-1">Particulars</th>
                  <th class="p-1 text-right">Amount (PKR)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td class="p-1">Admission Fee</td><td class="p-1 text-right">1,500</td></tr>
                <tr><td class="p-1">Tuition Fee (Per Sem)</td><td class="p-1 text-right">8,500</td></tr>
                <tr><td class="p-1">Univ / Board Reg.</td><td class="p-1 text-right">2,800</td></tr>
                <tr><td class="p-1">Library / Lab Fund</td><td class="p-1 text-right">1,200</td></tr>
                <tr><td class="p-1">Sports & Welfare</td><td class="p-1 text-right">500</td></tr>
                <tr class="font-bold border-t bg-gray-50"><td class="p-1">Total Payable:</td><td class="p-1 text-right text-emerald-900">PKR 14,500</td></tr>
              </tbody>
            </table>
            <div class="text-[9px] text-gray-500 italic mb-2">${copy.note}</div>
          </div>

          <div class="border-t pt-3 mt-2 flex justify-between text-[10px]">
            <span>Cashier / Officer</span>
            <span>Manager</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}
