import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Errors from "../components/commons/Errors";
import InputModal from "../components/commons/InputModal";
import IdeaList from "../components/IdeaList";
import IdeaSearchbar from "../components/IdeaSearchbar";
import { useFirebase } from "../hooks/useFirebase";
import PageWrapper from "../layouts/PageWrapper";
import Idea from "../models/Idea";
import LoadingPage from "./LoadingPage";
import { v4 } from "uuid";
import Plus from "../components/commons/Plus";

const IdeaListPage = () => {
  const { items, loading, createOrUpdate, remove } = useFirebase<Idea>();

  const [ideas, setIdeas] = useState([...items]);
  const [displayFormat, setDisplayFormat] = useState("grid");
  const [errors, setErrors] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const history = useHistory();

  useEffect(() => {
    setIdeas([...items]);
  }, [items]);

  function createIdea(name: string) {
    const p = {
      id: v4(),
      name,
      description: "",
      technologies: [],
      notes: [],
      links: [],
      repository: "",
      created: new Date(),
      lastModified: new Date(),
    };
    createOrUpdate(p)
      .then((_) => history.push("/ideas/" + p.id))
      .catch((err) => setErrors([err.message]));
  }
  function filterIdea(keyword?: string) {
    if (keyword && keyword.length !== 0) {
      setIdeas(
        items.filter(
          (p) => p.name.includes(keyword) || p.technologies.includes(keyword)
        )
      );
    } else {
      setIdeas([...items]);
    }
  }

  function changeDisplayFormat(format: string) {
    setDisplayFormat(format);
  }

  function removeIdea(id: string) {
    remove(id)
      .then((_) => setIdeas(items.filter((p) => p.id !== id)))
      .catch((err: Error) => setErrors([err.message]));
  }

  function selectIdea(id: string) {
    history.push("/ideas/" + id);
  }

  return loading ? (
    <LoadingPage />
  ) : (
    <PageWrapper>
      <div className="w-5/6 mx-auto">
        <IdeaSearchbar
          onFilter={filterIdea}
          onChangeDisplayFormat={changeDisplayFormat}
        />
      </div>
      <Errors errors={errors} />
      <div className="fade-in">
        <IdeaList
          onRemove={removeIdea}
          onSelect={selectIdea}
          displayFormat={displayFormat}
          ideas={ideas}
        />
      </div>
      <footer>
        <Plus onClick={(_) => setIsModalVisible(true)} />
        <InputModal
          title="create new idea"
          subtitle="add you new idea here"
          type="text"
          isVisible={isModalVisible}
          onOk={createIdea}
          onCancel={() => setIsModalVisible(false)}
        />
      </footer>
    </PageWrapper>
  );
};

export default IdeaListPage;
