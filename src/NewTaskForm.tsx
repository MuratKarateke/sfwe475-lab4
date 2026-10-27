import { useState } from "react";
import { CreateTaskSchema } from "./schemas";

// TaskBoard'dan gelecek onAddTask fonksiyonunun tipini tanımlıyoruz
type NewTaskFormProps = {
  onAddTask: (taskInfo: { title: string; dueDate?: string }) => void;
};

function NewTaskForm({ onAddTask }: NewTaskFormProps) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Zod ile verileri doğruluyoruz
    const result = CreateTaskSchema.safeParse({ title, dueDate });

    if (!result.success) {
      // Doğrulama başarısızsa hataları state'e kaydedip işlemi durduruyoruz
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    // Doğrulama başarılıysa hataları temizle, görevi ekle ve inputları sıfırla
    setErrors({});
    onAddTask(result.data);
    setTitle("");
    setDueDate("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <div>
        <label htmlFor="title">Task title</label>
        <input 
          id="title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        {/* Başlık hatası varsa input'un hemen altında gösteriyoruz */}
        {errors.title && <p style={{ color: "red", margin: 0 }}>{errors.title[0]}</p>}
      </div>

      <div style={{ marginTop: "10px" }}>
        <label htmlFor="dueDate">Due Date</label>
        <input 
          id="dueDate" 
          value={dueDate} 
          onChange={(e) => setDueDate(e.target.value)} 
        />
        {/* Tarih hatası varsa input'un hemen altında gösteriyoruz */}
        {errors.dueDate && <p style={{ color: "red", margin: 0 }}>{errors.dueDate[0]}</p>}
      </div>

      <button type="submit" style={{ marginTop: "10px" }}>Add task</button>
    </form>
  );
}

export default NewTaskForm;