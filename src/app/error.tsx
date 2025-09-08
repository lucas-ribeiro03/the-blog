"use client";

import ErrorMessage from "@/components/ErrorMessage";

type RootErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function RootErrorPage({}: RootErrorPageProps) {
  return (
    <>
      <ErrorMessage
        pageTitle="Internal server errror"
        contentTitle="501"
        content="Ocorreu um erro da qual nossa aplicação não conseguiu se recuperar. Tente novamente mais tarde"
      />
    </>
  );
}
