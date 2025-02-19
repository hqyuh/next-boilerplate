import type { TFCC } from '@/@types';

export const Show: TFCC<{ when?: boolean }> = (props) => <>{props.when ? <>{props.children}</> : null}</>;
