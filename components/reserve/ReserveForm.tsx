"use client";

import { useState } from "react";

type FormState = "idle" | "sending" | "success" | "error";

const INITIAL = {
  name: "",
  phone: "",
  email: "",
  preferredDate1: "",
  preferredDate2: "",
  preferredTime: "",
  message: "",
  agree: false,
};

export function ReserveForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [values, setValues] = useState(INITIAL);

  const useDummy = process.env.NEXT_PUBLIC_RESERVE_USE_DUMMY === "true";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!values.agree) return;
    setFormState("sending");

    try {
      if (useDummy) {
        await new Promise((r) => setTimeout(r, 800));
        setFormState("success");
        setValues(INITIAL);
        return;
      }
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("送信に失敗しました");
      setFormState("success");
      setValues(INITIAL);
    } catch {
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-center text-emerald-800">
        <p className="font-medium">送信完了しました。</p>
        <p className="mt-1 text-sm">ご連絡をお待ちください。</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
          お名前 <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          required
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-neutral-700">
          電話番号 <span className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          required
          value={values.phone}
          onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
          className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
          メールアドレス <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          required
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>
      <div>
        <label htmlFor="preferredDate1" className="block text-sm font-medium text-neutral-700">
          希望日（第1希望）
        </label>
        <input
          id="preferredDate1"
          type="date"
          value={values.preferredDate1}
          onChange={(e) => setValues((v) => ({ ...v, preferredDate1: e.target.value }))}
          className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>
      <div>
        <label htmlFor="preferredDate2" className="block text-sm font-medium text-neutral-700">
          希望日（第2希望）
        </label>
        <input
          id="preferredDate2"
          type="date"
          value={values.preferredDate2}
          onChange={(e) => setValues((v) => ({ ...v, preferredDate2: e.target.value }))}
          className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>
      <div>
        <label htmlFor="preferredTime" className="block text-sm font-medium text-neutral-700">
          希望時間帯
        </label>
        <select
          id="preferredTime"
          value={values.preferredTime}
          onChange={(e) => setValues((v) => ({ ...v, preferredTime: e.target.value }))}
          className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        >
          <option value="">選択してください</option>
          <option value="午前">午前</option>
          <option value="午後">午後</option>
          <option value="夕方">夕方</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-neutral-700">
          メッセージ
        </label>
        <textarea
          id="message"
          rows={3}
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>
      <div className="flex items-start gap-2">
        <input
          id="agree"
          type="checkbox"
          required
          checked={values.agree}
          onChange={(e) => setValues((v) => ({ ...v, agree: e.target.checked }))}
          className="mt-1 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500"
        />
        <label htmlFor="agree" className="text-sm text-neutral-700">
          <a href="/privacy" className="underline hover:no-underline">プライバシーポリシー</a>
          に同意する <span className="text-red-500">*</span>
        </label>
      </div>
      {formState === "error" && (
        <p className="text-sm text-red-600">送信に失敗しました。しばらくしてからお試しください。</p>
      )}
      <button
        type="submit"
        disabled={formState === "sending"}
        className="w-full rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition-[transform,box-shadow] duration-200 hover:scale-[1.01] hover:shadow-md disabled:opacity-70"
      >
        {formState === "sending" ? "送信中…" : "送信する"}
      </button>
    </form>
  );
}
