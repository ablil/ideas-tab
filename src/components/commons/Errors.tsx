import React, { FC } from "react";

const Errors: FC<{ errors: string[] }> = ({ errors }) => {
  return errors.length ? (
    <section className="text-center text-red-400 text-sm font-bold">
      {errors.map((err) => (
        <article>{err}</article>
      ))}
    </section>
  ) : null;
};

export default Errors;
