function main() {
  const gradeMap = new Map([
    ['A+', 5],
    ['A', 5],
    ['A-', 4.5],
    ['B+', 4],
    ['B', 3.5],
    ['C+', 3],
    ['C', 2.5],
    ['D+', 2],
    ['D', 1.5],
    ['F', 0],
  ]);

  // constants, extracted for maintainability
  const GRADED_MC_ELEMENT_ID = 'DERIVED_SSS_GRD_SSS_UNIT_DISP_4$0';
  const UNGRADED_MC_ELEMENT_ID = 'DERIVED_SSS_GRD_SSS_UNIT_DISP_4$1';
  const CAP_ELEMENT_ID = 'DERIVED_SSS_GRD_SSS_UNIT_DISP_4$2';
  const GRADE_ELEMENT_ID_PREFIX = 'N_STDNT_ENRL_V2_CRSE_GRADE_OFF';
  const ROW_ELEMENT_ID_PREFIX = 'TERM_CLASSES';
  const UNIT_ID_PREFIX = 'N_STDNT_ENRL_V2_UNT_TAKEN';

  // HTML elements holding the values
  const gradedMCElement = document.getElementById(GRADED_MC_ELEMENT_ID);
  const ungradedMCElement = document.getElementById(UNGRADED_MC_ELEMENT_ID);
  const CAPElement = document.getElementById(CAP_ELEMENT_ID);

  // global variables
  const initialCAP = parseFloat(CAPElement.innerText);
  const initialGradedMC = parseFloat(gradedMCElement.innerText);
  const allMC = initialGradedMC + parseFloat(ungradedMCElement.innerText);
  let currentEarned = initialCAP * initialGradedMC;
  let currentGradedMC = initialGradedMC;

  // invoked when row is clicked
  function clickSU(rowElement) {
    const multiplier = rowElement.changed ? 1 : -1;
    const gradeElement = rowElement.querySelector(`[id^="${GRADE_ELEMENT_ID_PREFIX}"]`);
    currentEarned += rowElement.earned * multiplier;
    currentGradedMC += rowElement.unit * multiplier;
    // below is changing displayed text
    const newUngradedMC = allMC - currentGradedMC;
    let newCAP = currentEarned / currentGradedMC;
    if (Number.isNaN(newCAP)) {
      newCAP = 0;
    }
    const suText = rowElement.earned >= 2.0 ? 'S' : 'U';
    const newGrade = rowElement.changed ? rowElement.grade : suText;
    gradedMCElement.innerText = currentGradedMC.toFixed(2);
    ungradedMCElement.innerText = newUngradedMC.toFixed(2);
    CAPElement.innerText = `${newCAP.toFixed(2)} (${(newCAP - initialCAP).toFixed(2)})`;
    gradeElement.innerText = newGrade;
    if (!rowElement.changed) {
      gradeElement.style.fontWeight = 'bold';
      gradeElement.style.color = 'red';
    } else {
      gradeElement.style.fontWeight = 'normal';
      gradeElement.style.color = 'initial';
    }
    rowElement.changed = !rowElement.changed;
  }

  // add various necessary attributes to rows
  function attachAttributes() {
    document.querySelectorAll(`[id^="${ROW_ELEMENT_ID_PREFIX}"]`).forEach((rowElement) => {
      const gradeText = rowElement.querySelector(`[id^="${GRADE_ELEMENT_ID_PREFIX}"]`).innerText;
      if (gradeMap.has(gradeText)) {
        rowElement.grade = gradeText;
        rowElement.unit = parseFloat(rowElement.querySelector(`[id^="${UNIT_ID_PREFIX}"]`).innerText);
        rowElement.earned = rowElement.unit * gradeMap.get(gradeText);
        rowElement.changed = false;
        rowElement.onclick = function clicked() { clickSU(this); };
        rowElement.style.cursor = 'pointer';
      }
    });
  }
  attachAttributes();
}

const observer = new MutationObserver(main);
observer.observe(document, {
  subtree: true,
  childList: true,
  attributes: true,
  characterData: true,
});

main();
