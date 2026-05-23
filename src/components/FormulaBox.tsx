import styles from './FormulaBox.module.css'

interface FormulaBoxProps {
  formula: string
  note?: string
}

export default function FormulaBox({ formula, note }: FormulaBoxProps) {
  return (
    <div className={styles.container}>
      <div className={styles.label}>The formula</div>
      <div className={styles.formula}>{formula}</div>
      {note && (
        <div className={styles.note} data-testid="formula-note">
          {note}
        </div>
      )}
    </div>
  )
}
