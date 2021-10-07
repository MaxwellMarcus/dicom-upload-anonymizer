import { useState } from 'react'
import { PageHeaderProps } from '../../myTypes'
import styles from './PageHeader.module.css'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Link from '@material-ui/core/Link'
import Avatar from '@material-ui/core/Avatar'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { parseUserString } from '../../utils'
import { logoutUserLink, myProfileLink } from '../../constants'

const PageHeader: React.FC<PageHeaderProps> = ({
  userInfo,
}: PageHeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const initials = parseUserString(userInfo.userString)

  return (
    <Grid
      container
      direction='row'
      justifyContent='space-between'
      alignItems='center'
    >
      <Grid item>
        <h3 className={styles.title}>Subject Data Upload</h3>
      </Grid>
      <Grid item>
        <Button
          aria-controls='simple-menu'
          aria-haspopup='true'
          onClick={handleClick}
        >
          <Avatar className={styles.avatar}>{initials}</Avatar>
          <ArrowDropDownIcon />
        </Button>
        <Menu
          id='simple-menu'
          keepMounted
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            className={styles.email}
            style={{ backgroundColor: 'transparent' }}
          >
            {userInfo.email}
          </MenuItem>
          <MenuItem className={styles.linkMenuItem}>
            <Link href={myProfileLink} className={styles.link} color='inherit'>
              <AccountCircleIcon fontSize='small' className={styles.icon} />
              My Profile
            </Link>
          </MenuItem>
          <MenuItem className={styles.linkMenuItem}>
            <Link href={logoutUserLink} className={styles.link} color='inherit'>
              <ExitToAppIcon fontSize='small' className={styles.icon} />
              Logout
            </Link>
          </MenuItem>
        </Menu>
      </Grid>
    </Grid>
  )
}

export default PageHeader
