import * as React from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Note from "types/Note";
import State from "types/State";
import { closeModal, closeSidebar, foldCategory, openModal } from "@lib/utils";
import {
  SidebarActive,
  SidebarStyle,
  SidebarHeader,
  SidebarNote,
  SidebarBody,
  CloseSidebarBtn,
  SidebarFooter,
} from "./styles";
import { SrOnly, Divider } from "@styles/Global";
import SidebarSearch from "./SidebarSearch";
import CloseIcon from "@icons/CloseIcon";
import EditIcon from "@icons/EditIcon";
import Category from "types/Category";
import {
  CategoryDiv,
  CategoryTitle,
  EditCategory,
  CategoryTitleContainer,
} from "../../styles/Category";
import AlertModal from "@components/modals/AlertModal";
import { ModalIds } from "@lib/constants";
import EditCategoryModal from "@components/modals/EditCategory";
import { updateCategoryById } from "@actions/categories";
import { RequestData } from "@lib/fetch";
import ArrowIcon from "@components/icons/ArrowIcon";
import { getNoteById } from "@actions/note";

interface Props {
  notes: Note[];
  activeNote: Note | null;
  categories: Category[];
  editing: boolean | null;
  updateCategoryById: (id: string, data: RequestData, notify?: boolean) => void;
  getNoteById: (noteId: string, share: boolean) => Promise<boolean | undefined>;
}

const noCategory: Category = {
  name: "No Category",
  _id: "no_category",
  folded: false,
  user_id: null,
  created_at: null,
};

const Sidebar: React.FC<Props> = ({
  notes,
  categories,
  activeNote,
  editing,
  updateCategoryById,
  getNoteById,
}) => {
  const [searching, setSearching] = React.useState(false);
  const [filteredNotes, setFilteredNotes] = React.useState(notes);
  const [tempNoteId, setTempNoteId] = React.useState<string | null>(null);
  const [tempCategory, setTempCategory] = React.useState<Category | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    setFilteredNotes(notes);
  }, [notes]);

  const setActiveNote = async (id: string, force = editing) => {
    if (force) {
      setTempNoteId(id);
      return openModal(ModalIds.AlertUnsavedChanges);
    }

    closeModal(ModalIds.AlertUnsavedChanges);
    setTempNoteId(null);
    await getNoteById(id, false);

    router.replace({
      query: {
        noteId: id,
      },
    });
  };

  const filterNotes = (filter: string) => {
    if (filter === "") {
      setSearching(false);
      return setFilteredNotes(notes);
    }

    setSearching(true);
    setFilteredNotes(
      notes &&
        notes.filter((note) => {
          const title = note.title.toLowerCase();
          return title.includes(filter);
        }),
    );
  };

  const handleEditCategory = (category: Category) => () => {
    setTempCategory(category);
    openModal(ModalIds.EditCategory);
  };

  const handleFold = (category: Category) => () => {
    if (category._id === "no_category") return;
    const folded = foldCategory(category._id);

    updateCategoryById(
      category._id,
      {
        folded,
        name: category.name,
      },
      false,
    );
  };

  return (
    <>
      <SidebarStyle id="sidebar">
        <SidebarHeader>
          <SidebarSearch filterNotes={filterNotes} />
          <CloseSidebarBtn onClick={() => closeSidebar("sidebar")}>
            <SrOnly>Close Menu</SrOnly>
            <CloseIcon />
          </CloseSidebarBtn>
        </SidebarHeader>

        <SidebarBody>
          <>
            <div>
              {[...categories, noCategory].map((cat, ci) => {
                const category = cat.name;
                const categoryNotes = filteredNotes?.filter((note) => {
                  return note.category_id === cat._id;
                });
                if (searching && categoryNotes.length <= 0) {
                  return null;
                } else if (cat._id === "no_category" && categoryNotes.length <= 0) return null;

                return (
                  <CategoryDiv
                    className={cat.folded ? "folded" : ""}
                    id={`category-${cat._id}`}
                    key={ci}
                  >
                    <CategoryTitleContainer>
                      <CategoryTitle
                        categoryId={cat._id}
                        onClick={handleFold(cat)}
                        title="Click to fold"
                      >
                        {cat._id !== "no_category" ? <ArrowIcon /> : null}
                        {category}
                      </CategoryTitle>

                      {cat._id !== "no_category" ? (
                        <div>
                          <EditCategory onClick={handleEditCategory(cat)}>
                            <SrOnly>Edit</SrOnly>
                            <EditIcon />
                          </EditCategory>
                        </div>
                      ) : null}
                    </CategoryTitleContainer>

                    <div className="items">
                      {categoryNotes?.map((note) => {
                        if (note.category_id === cat._id) {
                          const isActiveNote = isActive(activeNote ? activeNote : notes?.[0], note);

                          return (
                            <SidebarNote
                              onClick={() => {
                                if (isActiveNote) return;
                                setActiveNote(note._id);
                                closeSidebar("sidebar");
                              }}
                              key={note._id}
                              title={note.title}
                              className={isActiveNote ? "active" : ""}
                            >
                              {note.title}
                            </SidebarNote>
                          );
                        }

                        return null;
                      })}
                    </div>
                  </CategoryDiv>
                );
              })}
            </div>

            <SidebarFooter>
              {/* don't show divider when no notes are found */}
              {notes && !notes[0] ? null : <Divider id="divider" />}

              <SidebarNote onClick={() => openModal(ModalIds.CreateNoteModal)}>
                Create new Note
              </SidebarNote>
              <SidebarNote onClick={() => openModal(ModalIds.CreateCategoryModal)}>
                Create new Category
              </SidebarNote>
              <SidebarNote onClick={() => openModal(ModalIds.OptionsModal)}>Options</SidebarNote>
            </SidebarFooter>
          </>
        </SidebarBody>
      </SidebarStyle>

      <SidebarActive onClick={() => closeSidebar("sidebar")} id="sidebarActive" />

      <AlertModal
        width="600px"
        id={ModalIds.AlertUnsavedChanges}
        title="Unsaved changes"
        description="You have unsaved changes, please save them before continuing!"
        actions={[
          {
            onClick: () => {
              setTempNoteId(null);
              closeModal(ModalIds.AlertUnsavedChanges);
            },
            name: "Go back",
          },
          {
            danger: true,
            onClick: () => setActiveNote(tempNoteId!, false),
            name: "Continue without saving",
          },
        ]}
      />

      <EditCategoryModal category={tempCategory} />
    </>
  );
};

function isActive(activeNote: Note | undefined, note: Note) {
  return activeNote?._id === note?._id;
}

const mapToProps = (state: State) => ({
  notes: state.notes.notes,
  categories: state.categories.categories,
  activeNote: state.notes.note,
  editing: state.notes.editing,
});

export default connect(mapToProps, { updateCategoryById, getNoteById })(Sidebar);
