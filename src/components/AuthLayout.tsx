import { type ReactNode } from 'react'
import { font, palette } from '../styles/theme';
import Logo from '../../public/white_logo.svg';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: palette.ink,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div style={{ width: "100%", maxWidth: 380 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <img src={Logo} alt="Abbey logo" style={{ width: 100}} />
          <div style={{ fontFamily: font.body, fontSize:26, color: palette.white }}>
           Connect Abbey
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
