"use client";

import { useEffect } from "react";

import { User, useStore } from "@/lib/store";

type Props = {
  user: User;
};

export function ClientHydrator({ user }: Props) {
  const { setUser } = useStore();

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return null;
}
