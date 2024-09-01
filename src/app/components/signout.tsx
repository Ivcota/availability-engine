"use client";

import { Button } from "~/components/ui/button";
import React from "react";
import { logout } from "~/server/actions/auth/signout";
import { toast } from "~/components/ui/use-toast";

const Signout = () => {
  return (
    <Button
      variant="outline"
      onClick={async () => {
        const result = await logout();
        if (result?.error) {
          toast({
            title: "Error",
            description: result.error,
          });
        }
      }}
    >
      Signout
    </Button>
  );
};

export default Signout;
