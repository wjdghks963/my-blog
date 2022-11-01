import React, { MouseEventHandler } from "react";

type Props = {
  name: string;
  routerFn: MouseEventHandler<HTMLLIElement> | undefined;
};

export function HeaderLi({ name, routerFn }: Props) {
  return (
    <li
      className="cursor-pointer py-1 list-none hover:shadow-xl w-1/3 text-center dark:text-white dark:hover:bg-white dark:hover:text-black dark:hover:shadow-slate-100"
      onClick={routerFn}
    >
      {name}
    </li>
  );
}
