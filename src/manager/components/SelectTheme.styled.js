import { styled } from '@storybook/theming';
import { Block } from '@storybook/addon-devkit';

export const Container = styled(Block)`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${({ theme }) => theme.background.app};
  color: ${({ theme }) => theme.input.color};

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

export const ListHolder = styled.div`
  overflow: auto;
  height: 1px;
  flex-grow: 1;
  padding: ${({ theme }) => theme.layoutMargin}px;
`;

export const SelectHolder = styled.div`
  overflow: auto;
  flex-grow: 1;
  padding: ${({ theme }) => theme.layoutMargin}px;
`;

export const SelectBox = styled.select`
  font-size: 14px;
  height: 30px;
  min-width: 120px;
`;

export const SelectHeading = styled.h3`
  font-size: 13px;
  margin-bottom: 6px;
  font-weight: 600;
  text-transform: capitalize;
`;

export const Theme = styled.button`
  border: 1px solid ${({ theme }) => theme.input.border};
  ${({ current, theme }) =>
    current ? `border-color: ${theme.color.secondary} !important;` : null}

  border-radius: ${({ theme }) => theme.appBorderRadius}px;
  background-color: ${({ theme }) => theme.background.hoverable};
  margin: ${({ theme }) => Math.floor(theme.layoutMargin / 2)}px 0px;
  padding: 0px;
  width: 100%;
  cursor: pointer;
  color: ${({ theme }) => theme.input.color};

  :hover {
    border: 1px solid ${({ theme }) => theme.appBorderColor};
  }
  :focus {
    outline: 1px solid ${({ theme }) => theme.color.dark};
    outline-offset: 2px;
  }

  display: flex;
  flex-direction: ${({ single }) => (single ? 'column' : 'row')};
  justify-content: flex-start;
  align-items: center;
`;

export const AvatarHolder = styled.div`
  position: relative;
  width: ${({ single }) => (single ? '120px' : '36px')};
  height: ${({ single }) => (single ? '120px' : '36px')};
  margin: 16px;
`;

export const ThemeAvatar = styled.div`
  width: 100%;
  height: 100%;
`;

export const Title = styled.h4`
  margin-left: 6px;
  font-size: ${({ single }) => (single ? '32px' : '16px')};
  font-weight: ${({ single }) => (single ? 'bold' : 'normal')};
`;
