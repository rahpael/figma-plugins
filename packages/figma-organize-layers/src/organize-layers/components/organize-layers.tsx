/** @jsx h */
import {
  Button,
  Checkbox,
  Columns,
  Container,
  SegmentedControl,
  spaceHorizontalIcon,
  spaceVerticalIcon,
  Text,
  TextboxNumeric,
  useForm,
  VerticalSpace
} from '@create-figma-plugin/ui'
import {
  emit,
  evaluateNumericExpression,
  on
} from '@create-figma-plugin/utilities'
import { Fragment, h } from 'preact'
import { useEffect } from 'preact/hooks'

import { groupDefinitions } from '../utilities/group-definitions'
import { Preview } from './preview/preview'

export function OrganizeLayers(props: { [key: string]: any }): h.JSX.Element {
  const { state, handleChange, handleSubmit, isValid } = useForm(props, {
    validate: function ({ layers }) {
      return layers.length > 0
    },
    onSubmit: function ({
      combineSingleLayerGroups,
      groupDefinition,
      horizontalSpace,
      verticalSpace
    }) {
      emit('SUBMIT', {
        combineSingleLayerGroups,
        groupDefinition,
        horizontalSpace: evaluateNumericExpression(horizontalSpace) || 0,
        verticalSpace: evaluateNumericExpression(verticalSpace) || 0
      })
    },
    onClose: function () {
      emit('CLOSE_UI')
    }
  })
  useEffect(
    function () {
      return on('SELECTION_CHANGED', function ({
        layers,
        maximumGroupDefinition
      }) {
        handleChange({ layers, maximumGroupDefinition })
      })
    },
    [handleChange]
  )
  const {
    combineSingleLayerGroups,
    groupDefinition,
    horizontalSpace,
    layers,
    maximumGroupDefinition,
    verticalSpace
  } = state
  return (
    <Fragment>
      <Preview
        combineSingleLayerGroups={combineSingleLayerGroups}
        groupDefinition={groupDefinition}
        layers={layers}
      />
      <Container space="medium">
        <VerticalSpace space="large" />
        <Text muted>Group by text before</Text>
        <VerticalSpace space="small" />
        <SegmentedControl
          name="groupDefinition"
          value={Math.min(groupDefinition, maximumGroupDefinition)}
          options={groupDefinitions.slice(0, maximumGroupDefinition)}
          onChange={handleChange}
        />
        <VerticalSpace space="large" />
        <Text muted>Space between layers</Text>
        <VerticalSpace space="small" />
        <Columns space="extraSmall">
          <TextboxNumeric
            name="horizontalSpace"
            icon={spaceHorizontalIcon}
            value={horizontalSpace}
            minimum={0}
            onChange={handleChange}
          />
          <TextboxNumeric
            name="verticalSpace"
            icon={spaceVerticalIcon}
            value={verticalSpace}
            minimum={0}
            onChange={handleChange}
          />
        </Columns>
        <VerticalSpace space="large" />
        <Checkbox
          name="combineSingleLayerGroups"
          onChange={handleChange}
          value={combineSingleLayerGroups}
        >
          <Text>Combine single-layer groups</Text>
        </Checkbox>
        <VerticalSpace space="large" />
        <Button
          fullWidth
          disabled={isValid() === false}
          focused
          onClick={handleSubmit}
        >
          Organize Layers
        </Button>
        <VerticalSpace space="small" />
      </Container>
    </Fragment>
  )
}
