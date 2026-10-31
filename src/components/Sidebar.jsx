import QuestionGrid from './QuestionGrid';

export default function Sidebar(props) {
  return (
    <aside className="sidebar">
      <QuestionGrid {...props} />
    </aside>
  );
}
