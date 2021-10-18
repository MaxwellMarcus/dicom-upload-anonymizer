import { MenuSelectionProps } from '../../myTypes'
import styles from './MenuSelection.module.css'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const MenuSelection: React.FC<MenuSelectionProps> = ({
  label,
  field,
  value,
  menuOptions,
  emptyOptionText,
  handleOnChange,
}: MenuSelectionProps) => {
  return (
    <Grid container className={field === 'project' ? styles.gridContainer : ''}>
      <Grid item xs={5}>
        <FormControl variant='outlined' fullWidth={true} size='small'>
          <InputLabel
            id={`${field}-label`}
            shrink
            className={`${styles.projectInputLabel} ${styles.boldMenuLabel}`}
          >
            {label}
          </InputLabel>
          <Select
            labelId={`${field}-label`}
            value={value}
            onChange={(event) => handleOnChange(event.target.value as string)}
            disabled={menuOptions.length === 0}
            displayEmpty={true}
          >
            <MenuItem value=''>{emptyOptionText}</MenuItem>
            {menuOptions.map((option, index) => (
              <MenuItem value={option} key={index}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default MenuSelection
