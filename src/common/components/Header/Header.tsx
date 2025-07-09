import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import {containerSx} from "@/components/TodolistItem.styles.ts";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {NavButton} from "@/common/components/NavButton/NavButton.ts";
import Switch from "@mui/material/Switch";
import AppBar from "@mui/material/AppBar";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectThemeMode} from "@/app/app-selectors.ts";
import {getTheme} from "@/common/theme/theme.ts";
import {changeThemeModeAC} from "@/app/app-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

export const Header = () => {
    // const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const themeMode = useAppSelector(selectThemeMode)

    const dispatch = useAppDispatch()

    const theme = getTheme(themeMode)

    // const theme = createTheme({
    //     palette: {
    //         mode: themeMode,
    //         primary: {
    //             main: '#087EA4'
    //         }
    //     }
    // })

    const changeMode = () => {
        // setThemeMode(themeMode === 'light' ? 'dark' : 'light')
        dispatch(changeThemeModeAC({themeMode: themeMode === "light" ? 'dark' : 'light'}))
    }

    return (
        <AppBar position="static" sx={{mb: '30px'}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Container maxWidth={'lg'} sx={containerSx}>
                    <IconButton color={"inherit"}>
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <NavButton>Sign in</NavButton>
                        <NavButton>Sign up</NavButton>
                        <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                        <Switch color={'default'} onChange={changeMode}/>
                    </div>
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default Header;